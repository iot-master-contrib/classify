package api

import (
	"github.com/gin-gonic/gin"
	"github.com/iot-master-contrib/classify/types"
	"github.com/zgwit/iot-master/v3/pkg/curd"
	"time"
)

// @Summary 查询设备
// @Schemes
// @Description 查询设备
// @Tags device
// @Param search body ParamSearch true "查询参数"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyList[Device] 返回设备信息
// @Router /device/search [post]
func noopDeviceSearch() {}

// @Summary 查询设备
// @Schemes
// @Description 查询设备
// @Tags device
// @Param search query ParamList true "查询参数"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyList[Device] 返回设备信息
// @Router /device/list [get]
func noopDeviceList() {}

// @Summary 获取设备
// @Schemes
// @Description 获取设备
// @Tags device
// @Param id path int true "设备ID"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[Device] 返回设备信息
// @Router /device/{id} [get]
func noopDeviceGet() {}

// @Summary 修改设备
// @Schemes
// @Description 修改设备
// @Tags device
// @Param id path int true "设备ID"
// @Param device body Device true "设备信息"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[Device] 返回设备信息
// @Router /device/{id} [post]
func noopDeviceUpdate() {}

func deviceRouter(app *gin.RouterGroup) {

	app.POST("/search", curd.ApiSearchWith[types.Device]([]*curd.Join{
		{"product", "product_id", "id", "name", "product"},
		//TODO 添加分类联合查询
		{"device_type", "type_id", "id", "name", "type"},
		{"device_area", "area_id", "id", "name", "area"},
		{"device_group", "group_id", "id", "name", "group"},
	}))

	app.GET("/list", curd.ApiList[types.Device]())

	app.GET("/:id", curd.ParseParamStringId, curd.ApiGet[types.Device]())

	app.POST("/:id", curd.ParseParamStringId, curd.ApiUpdate[types.Device]("area_id", "group_id", "type_id"))

}

// 从model.Device中复制，并加入分类字段，
type Device struct {
	Id        string `json:"id" xorm:"pk"` //ClientID
	GatewayId string `json:"gateway_id,omitempty" xorm:"index"`
	ProductId string `json:"product_id,omitempty" xorm:"index"`

	TypeId  string `json:"type_id,omitempty" xorm:"index"`  //类型
	AreaId  string `json:"area_id,omitempty" xorm:"index"`  //区域
	GroupId string `json:"group_id,omitempty" xorm:"index"` //分组

	Name       string             `json:"name"`
	Desc       string             `json:"desc,omitempty"`
	Parameters map[string]float64 `json:"parameters,omitempty"` //模型参数，用于报警检查
	Disabled   bool               `json:"disabled,omitempty"`
	Created    time.Time          `json:"created,omitempty" xorm:"created"`
}
