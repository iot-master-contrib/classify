package api

import (
	"github.com/gin-gonic/gin"
	"github.com/iot-master-contrib/classify/types"
	"github.com/zgwit/iot-master/v3/pkg/curd"
)

// @Summary 查询区域数量
// @Schemes
// @Description 查询区域数量
// @Tags device-area
// @Param search body ParamSearch true "查询参数"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[int64] 返回区域数量
// @Router /device/area/count [post]
func noopDeviceAreaCount() {}

// @Summary 查询区域
// @Schemes
// @Description 查询区域
// @Tags device-area
// @Param search body ParamSearch true "查询参数"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyList[types.DeviceArea] 返回区域信息
// @Router /device/area/search [post]
func noopDeviceAreaSearch() {}

// @Summary 查询区域
// @Schemes
// @Description 查询区域
// @Tags device-area
// @Param search query ParamList true "查询参数"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyList[types.DeviceArea] 返回区域信息
// @Router /device/area/list [get]
func noopDeviceAreaList() {}

// @Summary 创建区域
// @Schemes
// @Description 创建区域
// @Tags device-area
// @Param search body types.DeviceArea true "区域信息"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[types.DeviceArea] 返回区域信息
// @Router /device/area/create [post]
func noopDeviceAreaCreate() {}

// @Summary 修改区域
// @Schemes
// @Description 修改区域
// @Tags device-area
// @Param id path string true "区域ID"
// @Param device-area body types.DeviceArea true "区域信息"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[types.DeviceArea] 返回区域信息
// @Router /device/area/{id} [post]
func noopDeviceAreaUpdate() {}

// @Summary 获取区域
// @Schemes
// @Description 获取区域
// @Tags device-area
// @Param id path string true "区域ID"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[types.DeviceArea] 返回区域信息
// @Router /device/area/{id} [get]
func noopDeviceAreaGet() {}

// @Summary 删除区域
// @Schemes
// @Description 删除区域
// @Tags device-area
// @Param id path string true "区域ID"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[types.DeviceArea] 返回区域信息
// @Router /device/area/{id}/delete [get]
func noopDeviceAreaDelete() {}

// @Summary 导出区域
// @Schemes
// @Description 导出区域
// @Tags device-area
// @Accept json
// @Produce octet-stream
// @Router /device/area/export [get]
func noopDeviceAreaExport() {}

// @Summary 导入区域
// @Schemes
// @Description 导入区域
// @Tags device-area
// @Param file formData file true "压缩包"
// @Accept mpfd
// @Produce json
// @Success 200 {object} ReplyData[int64] 返回区域数量
// @Router /device/area/import [post]
func noopDeviceAreaImport() {}

func deviceAreaRouter(app *gin.RouterGroup) {

	app.POST("/count", curd.ApiCount[types.DeviceArea]())
	app.POST("/search", curd.ApiSearch[types.DeviceArea]())
	app.GET("/list", curd.ApiList[types.DeviceArea]())
	app.POST("/create", curd.ApiCreateHook[types.DeviceArea](curd.GenerateRandomId[types.DeviceArea](8), nil))
	app.GET("/:id", curd.ParseParamStringId, curd.ApiGet[types.DeviceArea]())
	app.POST("/:id", curd.ParseParamStringId, curd.ApiUpdateHook[types.DeviceArea](nil, nil,
		"id", "name", "desc"))
	app.GET("/:id/delete", curd.ParseParamStringId, curd.ApiDeleteHook[types.DeviceArea](nil, nil))
	app.GET("/export", curd.ApiExport("device-area", "device-area"))
	app.POST("/import", curd.ApiImport("device-area"))
}
