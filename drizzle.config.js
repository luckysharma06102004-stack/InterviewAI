/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://neondb_owner:npg_a4ePYF7SXLTq@ep-square-king-anzmekq4.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require',
    }
};