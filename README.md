# Final Exam: Software Testing with Playwright

**ชื่อ-นามสกุล:** ธนโชติ รักชาติ  
**รหัสนักศึกษา:** 6804101337  
**ระบบสำหรับทดสอบ:** https://www.saucedemo.com/  

---

## สรุปแนวคิด Integration Testing (บทที่ 2)

### IT-01: Top-Down Integration Testing with Stub
* **Real Component:** ระบบ Login จริงของ SauceDemo ผ่าน UI
* **Stub Component:** หน้า Inventory DOM ที่ถูกจำลองด้วย `page.setContent()` หลังจาก Login สำเร็จ เพื่อทดสอบการทำงานระดับ UI สภาพแวดล้อมโดยไม่ต้องดึงข้อมูลสินค้าจริงจาก Server

### IT-02: Bottom-Up Integration Testing with Driver
* **Driver Component:** ฟังก์ชัน/การตั้งค่า Cookie `session-username` บน BrowserContext เพื่อข้ามขั้นตอนการกด Login
* **Real Component:** หน้า Inventory จริง และระบบ Shopping Cart จริงของ SauceDemo