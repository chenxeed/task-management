package data

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	"github.com/uptrace/bun"
)

type Task struct {
	bun.BaseModel `bun:"table:tasks"`

	Id          int64  `bun:"id,pk,autoincrement" json:"id"`
	Name        string `bun:"name,notnull" json:"name"`
	Description string `bun:"desc,notnull" json:"desc"`
	DueDate     int64  `bun:"due_date,notnull" json:"dueDate"`
	CreateDate  int64  `bun:"create_date,notnull" json:"createdDate"`
}

func CreateTaskTable(ctx context.Context, db bun.DB) sql.Result {
	res, err := db.NewCreateTable().Model((*Task)(nil)).Exec(ctx)
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println("table task created")
	}
	return res
}

func ReadTasks(ctx context.Context, db bun.DB) []Task {
	var tasks []Task
	err := db.NewSelect().Model(&tasks).Scan(ctx)
	if err != nil {
		fmt.Println(err)
	}
	if tasks == nil {
		emptyTask := []Task{}
		return emptyTask
	} else {
		return tasks
	}
}

func CreateTask(ctx context.Context, db bun.DB, newTask Task) Task {
	now := time.Now()
	newTask.CreateDate = now.UnixMilli()

	res, err := db.NewInsert().Model(&newTask).Exec(ctx)
	if err != nil {
		println("gagal")
		fmt.Println(err.Error())
	} else {
		println("sukses")
		println(res.LastInsertId())
	}
	return newTask
}

func UpdateTask(ctx context.Context, db bun.DB, taskId string, updatedTask Task) Task {
	_, err := db.NewUpdate().Model(&updatedTask).WherePK().Exec(ctx)
	if err != nil {
		fmt.Println(err)
	}
	return updatedTask
}
