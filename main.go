package classify

import (
	"embed"
	"encoding/json"
	"net/http"

	"github.com/iot-master-contrib/classify/api"
	_ "github.com/iot-master-contrib/classify/docs"
	"github.com/iot-master-contrib/classify/types"
	"github.com/zgwit/iot-master/v3/model"
	"github.com/zgwit/iot-master/v3/pkg/db"
	"github.com/zgwit/iot-master/v3/pkg/mqtt"
	"github.com/zgwit/iot-master/v3/pkg/web"
)

func App() *model.App {
	return &model.App{
		Id:   "classify",
		Name: "设备分类",
		Entries: []*model.AppEntry{{
			Path: "app/classify/devices",
			Name: "所有设备",
		}, {
			Path: "app/classify/area",
			Name: "区域",
		}, {
			Path: "app/classify/group",
			Name: "分组",
		}, {
			Path: "app/classify/type",
			Name: "类型",
		}, {
			Path: "app/classify/select/area",
			Name: "快速分区",
		}, {
			Path: "app/classify/select/group",
			Name: "快速分组",
		}, {
			Path: "app/classify/select/type",
			Name: "快速分类",
		}},
		Type:    "tcp",
		Address: "http://localhost" + web.GetOptions().Addr,
	}
}

//go:embed all:app/classify
var wwwFiles embed.FS

// @title 设备分类数据接口文档
// @version 1.0 版本
// @description API文档
// @BasePath /app/classify/api/
// @query.collection.format multi
func main() {
}

func Startup(app *web.Engine) error {
	//同步表结构
	err := db.Engine.Sync2(
		new(types.Device), new(types.DeviceType), new(types.DeviceArea), new(types.DeviceGroup),
	)
	if err != nil {
		return err
	}

	//注册前端接口
	api.RegisterRoutes(app.Group("/app/classify/api"))

	//注册接口文档
	web.RegisterSwaggerDocs(app.Group("/app/classify"), "classify")

	return nil
}

func Register() error {
	payload, _ := json.Marshal(App())
	token := mqtt.Publish("master/register", payload)
	token.Wait()
	return token.Error()
}

func Static(fs *web.FileSystem) {
	//前端静态文件
	fs.Put("/app/classify", http.FS(wwwFiles), "", "app/classify/index.html")
}

func Shutdown() error {

	//只关闭Web就行了，其他通过defer关闭

	return nil
}
