package main

import (
	"github.com/iot-master-contrib/classify"
	"github.com/zgwit/iot-master/v3/pkg/log"
	"github.com/zgwit/iot-master/v3/pkg/web"
)

func main() {
	app := web.CreateEngine()

	//调用启动
	err := classify.Startup(app)
	if err != nil {
		log.Fatal(err)
	}

	err = classify.Register()
	if err != nil {
		log.Fatal(err)
	}

	//注册静态页面
	fs := app.FileSystem()
	classify.Static(fs)

	//监听HTTP
	app.Serve()
}
