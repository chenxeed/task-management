package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type TaskStatus int64

const (
	NotUrgent TaskStatus = iota
	DueSoon
	Overdue
)

type task struct {
	Name        string `json:"name"`
	Description string `json:"desc"`
	DueDate     int    `json:"dueDate"`
	CreateDate  int    `json:"createdDate"`
}

// TODO: Get the data via PostgreSQL
var tasks = []task{
	{Name: "Open email", Description: "Find the new email that sent from our newest client", DueDate: 1675513005240, CreateDate: 1665213005240},
	{Name: "Read the book", Description: "You bought a new book. Now read it.", DueDate: 1675514005240, CreateDate: 1665213005240},
}

// getTask responds with the list of all tasks as JSON.
func getTasks(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, tasks)
}

func main() {
	router := gin.Default()
	router.GET("/tasks", getTasks)
	// TODO: Determine the root URL via .env for cross-environment
	router.Run("localhost:5050")
}
