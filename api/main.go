package main

import (
	data "data"
	lib "lib"
	"net/http"

	"github.com/gin-gonic/gin"
	cors "github.com/rs/cors/wrapper/gin"
)

type TaskStatus int64

const (
	NotUrgent TaskStatus = iota
	DueSoon
	Overdue
)

// getTask responds with the list of all tasks as JSON.
func getTasks(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, data.ReadTasks())
}

func postTask(c *gin.Context) {
	var newTask data.Task

	// Call BindJSON to bind the received JSON to
	// newAlbum.
	if err := c.BindJSON(&newTask); err != nil {
		return
	}
	newTask = data.CreateTask(newTask)
	c.IndentedJSON(http.StatusCreated, newTask)
}

func putTask(c *gin.Context) {
	var updatedTask data.Task

	taskId := c.Param("id")
	// Call BindJSON to bind the received JSON to
	// newAlbum.
	if err := c.BindJSON(&updatedTask); err != nil {
		return
	}

	updatedTask = data.UpdateTask(taskId, updatedTask)
	c.IndentedJSON(http.StatusOK, updatedTask)
}

func main() {
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
