package main

import (
	data "api/data"
	lib "api/lib"
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	cors "github.com/rs/cors/wrapper/gin"
	"github.com/uptrace/bun"
)

var ctx context.Context
var db *bun.DB

// getTask responds with the list of all tasks as JSON.
func getTasks(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, data.ReadTasks(ctx, *db))
}

func postTask(c *gin.Context) {
	var newTask data.Task

	if err := c.BindJSON(&newTask); err != nil {
		println(err.Error())
		return
	}
	newTask = data.CreateTask(ctx, *db, newTask)
	c.IndentedJSON(http.StatusCreated, newTask)
}

func putTask(c *gin.Context) {
	var updatedTask data.Task

	taskId := c.Param("id")
	if err := c.BindJSON(&updatedTask); err != nil {
		return
	}

	updatedTask = data.UpdateTask(ctx, *db, taskId, updatedTask)
	c.IndentedJSON(http.StatusOK, updatedTask)
}

func main() {
	// Define the database
	ctx = context.Background()
	db = data.ConnectDB()
	data.CreateTaskTable(ctx, *db)

	router := gin.Default()
	router.Use(cors.Default())
	router.GET("tasks", getTasks)
	router.POST("task", postTask)
	// NOTE: Intended to use PUT/PATCH but somehow it's not working on the webapp, giving "Provisional headers are shown" warning.
	// I am not sure why, thus for now use POST as it's working
	router.POST("task/:id", putTask)
	routerPath := lib.GoDotEnvVariable("API_HOST")
	router.Run(routerPath)
}
