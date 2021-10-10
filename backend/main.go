package main

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.Static("/assets", "../dist/assets")
	router.LoadHTMLFiles("../dist/index.html")
	router.GET("/", func(ctx *gin.Context) {
		ctx.HTML(http.StatusOK, "index.html", gin.H{})
	})

	router.NoRoute(func(ctx *gin.Context) {
		path := ctx.Request.URL.Path
		if strings.HasPrefix(path, "/assets") || strings.HasPrefix(path, "/api") {
			gin.Default().NoMethod()
		} else {
			ctx.HTML(http.StatusOK, "index.html", gin.H{})
		}
	})

	router.Run("localhost:8080")
}
