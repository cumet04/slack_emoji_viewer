package main

import (
	"bytes"
	"embed"
	"fmt"
	"io/fs"
	"net/http"
	"net/url"
	"strconv"
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

	router.POST("/emojis/", handleEmojiIndex)

	router.Run("localhost:8080")
}

func handleEmojiIndex(ctx *gin.Context) {
	type Request struct {
		Domain string `json:"domain"`
		Count  int    `json:"count"`
		Token  string `json:"token"`
	}
	var r Request
	if err := ctx.ShouldBindJSON(&r); err != nil {
		ctx.String(400, "failed to parse request body")
		return
	}

	result, err := fetchEmojiAll(r.Domain, r.Count, r.Token)
	if err != nil {
		panic(err)
	}

	ctx.Header("Content-Type", "application/json; charset=utf-8")
	ctx.String(200, result)
}

func fetchEmojiAll(domain string, count int, token string) (string, error) {
	u := fmt.Sprintf("https://%s.slack.com/api/emoji.adminList", domain)
	resp, err := http.PostForm(u, url.Values{"token": {token}, "count": {strconv.Itoa(count)}})
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	buf := new(bytes.Buffer)
	buf.ReadFrom(resp.Body)
	return buf.String(), nil
}
