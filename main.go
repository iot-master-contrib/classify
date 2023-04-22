package main

import (
	"classify/api"
	"classify/config"
	_ "classify/docs"
	"embed"
	"encoding/json"
	"github.com/zgwit/iot-master/v3/pkg/banner"
	"github.com/zgwit/iot-master/v3/pkg/build"
	"github.com/zgwit/iot-master/v3/pkg/db"
	"github.com/zgwit/iot-master/v3/pkg/log"
	"github.com/zgwit/iot-master/v3/pkg/mqtt"
	"github.com/zgwit/iot-master/v3/pkg/web"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

//go:embed all:app/classify
var wwwFiles embed.FS

func getConfigureName() string {
	app, _ := filepath.Abs(os.Args[0])
	ext := filepath.Ext(os.Args[0])
	return strings.TrimSuffix(app, ext) + ".yaml" //替换后缀名.exe为.yaml
}

// @title 设备分类数据接口文档
// @version 1.0 版本
// @description API文档
// @BasePath /app/classify/api/
// @query.collection.format multi
func main() {
	banner.Print("iot-master-plugin:classify")
	build.Print()

	cfg := getConfigureName()
	err := config.Load(cfg)
	if err != nil {
		log.Fatal(err)
	}

	err = log.Open(config.Config.Log)
	if err != nil {
		log.Fatal(err)
	}

	//加载数据库
	err = db.Open(config.Config.Database)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	//MQTT总线
	err = mqtt.Open(config.Config.Mqtt)
	if err != nil {
		log.Fatal(err)
	}
	defer mqtt.Close()

	//注册应用
	for _, v := range config.Config.Apps {
		payload, _ := json.Marshal(v)
		_ = mqtt.Publish("master/register", payload, false, 0)
	}

	app := web.CreateEngine(config.Config.Web)

	//注册前端接口
	api.RegisterRoutes(app.Group("/app/classify/api"))

	//注册接口文档
	web.RegisterSwaggerDocs(app.Group("/app/classify"))

	//前端静态文件
	web.RegisterFS(app, http.FS(wwwFiles), "", "app/classify/index.html")

	//监听HTTP
	log.Info("启动监听", config.Config.Web.Addr)
	err = app.Run(config.Config.Web.Addr)
	if err != nil {
		log.Fatal("HTTP 服务启动错误", err)
	}

}