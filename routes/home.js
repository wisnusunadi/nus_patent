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
    const kategori = req.query.kategori || "all"


    let whereStatement = {
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



    if (kategori == "barang") {
        whereStatement = {
          ...whereStatement,
          AND: [
            ...whereStatement.AND || [], // Preserve any existing AND conditions
            {
              kelas: {
                in: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34
                ],
              },
            },
          ],
        };
      }else if(kategori == 'jasa'){
        whereStatement = {
            ...whereStatement,
            AND: [
              ...whereStatement.AND || [], // Preserve any existing AND conditions
              {
                kelas: {
                  in: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
                },
              },
            ],
          };
      }

      





    

    const totalRows = await prisma.dataKelas.count({
        where : whereStatement
    });

    const totalPage = Math.ceil(totalRows/limit);

    const result = await prisma.dataKelas.findMany({
        where : whereStatement,
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