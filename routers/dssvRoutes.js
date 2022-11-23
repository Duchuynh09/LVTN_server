import express  from "express";
import {getDssvCoTheDangKy,getDssvDaDangKy,createDssvCoTheDangKy,createDssvDaDangKy,getDSSV}from "../controllers/dssvController.js";

const router = express.Router();

router.get('/dssvCoTheDangKy',getDssvCoTheDangKy)
router.get('/dssvDaDangKy',getDssvDaDangKy)
router.get('/ds',getDSSV)
router.get('/createSvCoTheDangKy',createDssvCoTheDangKy)

router.post('/',createDssvDaDangKy)


export default router  