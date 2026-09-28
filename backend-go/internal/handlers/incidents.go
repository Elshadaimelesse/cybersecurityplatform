
package handlers

import (
 "net/http"
 "github.com/gin-gonic/gin"
 "cybershield/backend/internal/models"
)

var incidents=[]models.Incident{
 {ID:1,Title:"Mozi Botnet",Severity:"Critical",Status:"Open"},
 {ID:2,Title:"CVE-2025-32433",Severity:"High",Status:"Investigating"},
}

func Health(c *gin.Context){
 c.JSON(http.StatusOK,gin.H{"status":"ok"})
}

func GetIncidents(c *gin.Context){
 c.JSON(http.StatusOK,incidents)
}

func CreateIncident(c *gin.Context){
 var inc models.Incident
 c.BindJSON(&inc)
 incidents=append(incidents,inc)
 c.JSON(http.StatusCreated,inc)
}
