package main

import (
	"fmt"
	lib "lib"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	cors "github.com/rs/cors/wrapper/gin"
)

type TaskStatus int64

const (
	NotUrgent TaskStatus = iota
	DueSoon
	Overdue
)

type task struct {
	Id          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"desc"`
	DueDate     int64  `json:"dueDate"`
	CreateDate  int64  `json:"createdDate"`
}

// TODO: Get the data via PostgreSQL
var tasks = map[string]task{
	"1": {Id: "1", Name: "Open email", Description: "Find the new email that sent from our newest client", DueDate: 1675513005240, CreateDate: 1665213005240},
	"2": {Id: "2", Name: "Read the book", Description: "You bought a new book. Now read it.", DueDate: 1675514005240, CreateDate: 1665213005240},
}

// getTask responds with the list of all tasks as JSON.
func getTasks(c *gin.Context) {
	arr := []task{}
	for _, v := range tasks {
		arr = append(arr, v)
	}
	c.IndentedJSON(http.StatusOK, arr)
}

func postTask(c *gin.Context) {
	var newTask task

	// Call BindJSON to bind the received JSON to
	// newAlbum.
	if err := c.BindJSON(&newTask); err != nil {
		return
	}

	newTask.Id = (uuid.New()).String()
	now := time.Now()
	newTask.CreateDate = now.UnixMilli()

	// Add the new album to the slice.
	tasks[newTask.Id] = newTask
	c.IndentedJSON(http.StatusCreated, newTask)
}

func putTask(c *gin.Context) {
	var updatedTask task

	// Call BindJSON to bind the received JSON to
	// newAlbum.
	if err := c.BindJSON(&updatedTask); err != nil {
		return
	}

	taskId := updatedTask.Id
	tasks[taskId] = updatedTask
	c.IndentedJSON(http.StatusOK, updatedTask)
}

func main() {
	fmt.Println(lib.GoDotEnvVariable("VITE_WEBAPP_HOST"))
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
