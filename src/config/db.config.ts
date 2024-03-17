
export const dbConfig={
    dialect: 'mysql',
    host: `/cloudsql/${process.env.CLOUD_INSTANCE}`,
    timestamps: false,
    dialectOptions: {
      socketPath: `/cloudsql/${process.env.CLOUD_INSTANCE}`
  }
}

