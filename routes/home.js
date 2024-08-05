const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const cors = require('cors');

// const app = express();
// app.use(cors());


 const prisma = new PrismaClient();


router.get("/", async (req,res)=>{
    res.send("Connected")
})

router.get("/kelas", async (req,res)=>{
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;

    const totalRows = await prisma.dataKelas.count({
        where : {
          OR : [
            {
                nama_eng : {
                    contains : search
                },
            },
                {
                    nama_ind : {
                        contains : search
                    }
                }
          ]
        }
    });

    const totalPage = Math.ceil(totalRows/limit);

    const result = await prisma.dataKelas.findMany({
        where : {
            OR : [
              {
                  nama_eng : {
                      contains : search
                  },
              },
                  {
                      nama_ind : {
                          contains : search
                      }
                  }
            ]
          },
          skip : offset,
          take : limit ,
          orderBy : {
            id : 'asc'
          }
    });

    const rePage = page+1;
    res.json({
        result: result,
        page: page,
        limit: limit,
        totalRows: totalRows,
        totalPage: totalPage,
        number: rePage <= 1 ? 1 : rePage * 10
    });
})

module.exports = router;