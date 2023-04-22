package api

import (
	"classify/types"
	"github.com/gin-gonic/gin"
	"github.com/zgwit/iot-master/v3/pkg/curd"
)

// @Summary 查询设备
// @Schemes
// @Description 查询设备
// @Tags device
// @Param search body ParamSearch true "查询参数"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyList[types.Device] 返回设备信息
// @Router /device/search [post]
func noopDeviceSearch() {}

// @Summary 查询设备
// @Schemes
// @Description 查询设备
// @Tags device
// @Param search query ParamList true "查询参数"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyList[types.Device] 返回设备信息
// @Router /device/list [get]
func noopDeviceList() {}

// @Summary 获取设备
// @Schemes
// @Description 获取设备
// @Tags device
// @Param id path int true "设备ID"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[types.Device] 返回设备信息
// @Router /device/{id} [get]
func noopDeviceGet() {}

// @Summary 修改设备
// @Schemes
// @Description 修改设备
// @Tags device
// @Param id path int true "设备ID"
// @Param device body types.Device true "设备信息"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[types.Device] 返回设备信息
// @Router /device/{id} [post]
func noopDeviceUpdate() {}

func deviceRouter(app *gin.RouterGroup) {

	app.POST("/search", curd.ApiSearchWith[types.Device]("device", []curd.Join{
		{"product", "product_id", "id", "name", "product"},
		//TODO 添加分类联合查询
	}))

	app.GET("/list", curd.ApiList[types.Device]())

	app.GET("/:id", curd.ParseParamStringId, curd.ApiGet[types.Device]())

	app.POST("/:id", curd.ParseParamStringId, curd.ApiUpdate[types.Device]("area_id", "group_id", "type_id"))

}
