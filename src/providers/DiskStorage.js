const fs = require("fs");
const path = require("path");
const uploadConfig = require("../configs/upload");

class DiskStorage {
    async saveFile(file) {
        //Movendo o arquivo
        await fs.promises.rename(
            // Resolve a sequencia de caminhos, para ser absoluto
            path.resolve(uploadConfig.TMP_FOLDER, file),
            path.resolve(uploadConfig.UPLOADS_FOLDER,file)
        )
        return file;
    }
    async deleFile(file) {
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

        try {
            await fs.promises.stat(filePath);
        } catch {
            return;
        }
        // Remove o arquivo
        await fs.promises.unlink(filePath);
    }
}

module.exports = DiskStorage;