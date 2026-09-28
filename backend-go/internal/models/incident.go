package routes

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

type Incident struct {
    ID       int    `json:"id"`
    Title    string `json:"title"`
    Severity string `json:"severity"`
    Status   string `json:"status"`
}

var incidents = []Incident{
    {1, "Mozi Botnet Detected", "Critical", "Open"},
    {2, "Cisco IOS XE Exploit Attempt", "High", "Investigating"},
    {3, "Erlang SSH RCE Attempt", "High", "Closed"},
}

func IncidentRoutes(api *gin.RouterGroup) {

    api.GET("/incidents", func(c *gin.Context) {
        c.JSON(http.StatusOK, incidents)
    })

    api.POST("/incidents", func(c *gin.Context) {
        var incident Incident

        if err := c.BindJSON(&incident); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }

        incident.ID = len(incidents) + 1
        incidents = append(incidents, incident)

        c.JSON(http.StatusCreated, incident)
    })
}