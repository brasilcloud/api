require("express-async-errors");
process.env.TZ = 'America/Sao_Paulo';
const uploadConfig = require("./configs/upload");
const AppError = require("./utils/AppError");

const cors = require("cors");
const express = require("express");

const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes);

app.use((error, request, response, next) => {
    // Verifica se o erro veio do lado do cliente
    // Verifica se o erro veio da instancia AppError
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    return response.status(500).json({
        status: "error",
        message: "Internal server error",
    });
});

const PORT = process.env.PORTA;
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});