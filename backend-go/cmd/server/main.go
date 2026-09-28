package main

import (
    "github.com/gin-gonic/gin"
    "cybershield/internal/routes"
)

func main() {

    router := gin.Default()

    api := router.Group("/api")
    {
        routes.IncidentRoutes(api)
        routes.AuthRoutes(api)
    }

    router.Run(":8080")
}