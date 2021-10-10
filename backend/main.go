package main

import (
	"embed"
	"io/fs"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

//go:embed dist/*
var public embed.FS

func main() {
	assets, err := fs.Sub(public, "dist/assets")
	if err != nil {
		// I have no idea what conditions this err is returned.
		// At least, fs.Sub seems success with no dist/assets directory on build.
		panic(err)
	}

	router := gin.Default()

	router.StaticFS("/assets", http.FS(assets))
	router.GET("/", func(ctx *gin.Context) {
		ctx.FileFromFS("dist/index.htm", http.FS(public))
	})

	router.NoRoute(func(ctx *gin.Context) {
		path := ctx.Request.URL.Path
		if strings.HasPrefix(path, "/assets") || strings.HasPrefix(path, "/api") {
			gin.Default().NoMethod()
		} else {
			ctx.FileFromFS("dist/index.htm", http.FS(public))
		}
	})

	router.Run("localhost:8080")
}
