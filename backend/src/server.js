import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/messages.route.js';
import path from 'path';

dotenv.config();


const app = express();
const __dirname = path.resolve();


const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.get("/port", (req, res) => {
    res.send("Current port is " + PORT);
});
app.get("/test", (req, res) => {
    res.send("Current test is working fine");
});



if(process.env.NODE_ENV === 'production'){
    let frontendPath = path.join(__dirname, '../frontend/dist');
    if (__dirname.split('/').pop() !== 'backend') {
        frontendPath = path.join(__dirname, 'frontend/dist');
    }

    app.use(express.static(frontendPath));

    app.get('*', (_, res) => {
        console.log(path.resolve(__dirname, frontendPath, 'index.html'));
        res.sendFile(path.resolve(__dirname, frontendPath, 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`  );
})
