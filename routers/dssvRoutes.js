import express from "express";
import {
  getDssvCoTheDangKy,
  getDssvDaDangKy,
  createEvent,
  getPendingEvents,
  getEvents,
  addDataCTDK,
  addDataDDK,
  deleteEvent,
  createPendingEvent,
  deletePendingEvent,
  getEventById,
  getEventsJoin,
  getEventsMake,
  softList,
  generateFile,
  getDsNhaTaiTro,
  totalEvent,
  toDayEvent,
  tomorrowDayEvent,
  getEventByName,
  registerSeatByRasa,
  newEnvent,
  enableEvent,
  moodEvent,
  getDssvCoTheDangKySpending,
} from "../controllers/dssvController.js";
import {
  checkUserToken,
  checkLecturerToken,
  checkAdminToken,
} from "../middleware/checkToken.js";

const router = express.Router();

router.get("/dssvCoTheDangKy/:id", checkUserToken, getDssvCoTheDangKy);
router.get("/dssvCoTheDangKySpending/:id", checkUserToken, getDssvCoTheDangKySpending);
router.get("/dssvDaDangKy/:id", checkUserToken, getDssvDaDangKy);
router.get("/getDsNhaTaiTro/:id", checkUserToken, getDsNhaTaiTro);

router.post("/getEventsJoin", checkUserToken, getEventsJoin);
router.post("/getEventsMake", checkLecturerToken, getEventsMake);

router.post("/softList/:id", softList);

router.get("/getPendingEvents", checkAdminToken, getPendingEvents);
router.get("/getEvents", checkUserToken, getEvents);

router.get("/getEventById/:id", checkUserToken, getEventById);

router.post("/createPendingEvent", checkLecturerToken, createPendingEvent); // tao event va chờ ad phê duyệt
router.get("/createEvent/:id", checkAdminToken, createEvent); // tạo event sau khi ad duyệt


router.post("/generateFile/:id", checkAdminToken, generateFile);
router.post("/addDataCTDK/:id", checkAdminToken, addDataCTDK);
// Bên dưới là đăng kí sự kiện
router.post("/addDataDDK/:id", checkUserToken, addDataDDK);
router.delete("/deleteEvent/:id", checkAdminToken, deleteEvent);
router.delete("/deletePendingEvent/:id", checkAdminToken, deletePendingEvent);

// rasa chat bot
router.get("/getTotal", totalEvent);
router.get("/getToDay", toDayEvent);
router.get("/getTomorrow", tomorrowDayEvent);
router.post("/getEventByName", getEventByName);
router.post("/registerSeatByRasa", registerSeatByRasa);
router.get("/getNewEvent", newEnvent);
router.get("/getEnableEvent", enableEvent);
router.get("/getMoodEvent", moodEvent);

export default router;
