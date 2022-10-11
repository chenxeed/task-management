package data

import (
	"sort"
	"time"

	"github.com/google/uuid"
)

type Task struct {
	Id          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"desc"`
	DueDate     int64  `json:"dueDate"`
	CreateDate  int64  `json:"createdDate"`
}

// TODO: Get the data via PostgreSQL
var tasks = map[string]Task{
	"1": {Id: "1", Name: "Open email", Description: "Find the new email that sent from our newest client", DueDate: 1675513005240, CreateDate: 1665213005240},
	"2": {Id: "2", Name: "Read the book", Description: "You bought a new book. Now read it.", DueDate: 1675514005240, CreateDate: 1665213005240},
}

// getTask responds with the list of all tasks as JSON.
func ReadTasks() []Task {
	arr := []Task{}
	for _, v := range tasks {
		arr = append(arr, v)
	}
	sort.Slice(arr, func(i, j int) bool {
		return arr[i].CreateDate < arr[j].CreateDate
	})
	return arr
}

func CreateTask(newTask Task) Task {
	newTask.Id = (uuid.New()).String()
	now := time.Now()
	newTask.CreateDate = now.UnixMilli()

	// Add the new album to the slice.
	tasks[newTask.Id] = newTask
	return newTask
}

func UpdateTask(taskId string, updatedTask Task) Task {
	tasks[taskId] = updatedTask
	return updatedTask
}
