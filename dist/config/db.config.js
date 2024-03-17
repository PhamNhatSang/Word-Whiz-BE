"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
exports.dbConfig = {
    dialect: 'mysql',
    host: `/cloudsql/${process.env.CLOUD_INSTANCE}`,
    timestamps: false,
    dialectOptions: {
        socketPath: `/cloudsql/${process.env.CLOUD_INSTANCE}`
    }
};
//# sourceMappingURL=db.config.js.map