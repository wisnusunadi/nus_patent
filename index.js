const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const app = express();
const cors = require('cors');

app.use(cors());

const prisma = new PrismaClient();

dotenv.config();
const PORT = process.env.PORT;

app.listen(PORT,() => {
    console.log("Express run " + PORT);
})

app.get("/", async (req,res)=>{
    res.send("Hello World")
})

app.get("/api/kelas", async (req,res)=>{
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


