import express  from "express";
import {getDssvCoTheDangKy,getDssvDaDangKy,createDssvCoTheDangKy,createDssvDaDangKy,getAdmin}from "../controllers/dssvController.js";

const router = express.Router();

router.get('/dssvCoTheDangKy',getDssvCoTheDangKy)
router.get('/dssvDaDangKy',getDssvDaDangKy)
router.get('/admin',getAdmin)


router.get('/createSvCoTheDangKy',createDssvCoTheDangKy)

router.post('/',createDssvDaDangKy)
// router.get('/update',updateProduct)


export default router