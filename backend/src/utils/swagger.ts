import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.1.0",
    info: {
      title: "EPINX API",
      version: "1.0.0",
      description: "EPIN & dijital ürün satış platformu için REST API dokümantasyonu"
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },
  apis: ["./src/routes/modules/*.ts"]
});
