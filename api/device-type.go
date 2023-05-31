package api

import (
	"github.com/gin-gonic/gin"
	"github.com/iot-master-contrib/classify/types"
	"github.com/zgwit/iot-master/v3/pkg/curd"
)

// @Summary 查询设备类型数量
// @Schemes
// @Description 查询设备类型数量
// @Tags device-type
// @Param search body ParamSearch true "查询参数"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[int64] 返回设备类型数量
// @Router /device/type/count [post]
func noopDeviceTypeCount() {}

// @Summary 查询设备类型
// @Schemes
// @Description 查询设备类型
// @Tags device-type
// @Param search body ParamSearch true "查询参数"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyList[types.DeviceType] 返回设备类型信息
// @Router /device/type/search [post]
func noopDeviceTypeSearch() {}

// @Summary 查询设备类型
// @Schemes
// @Description 查询设备类型
// @Tags device-type
// @Param search query ParamList true "查询参数"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyList[types.DeviceType] 返回设备类型信息
// @Router /device/type/list [get]
func noopDeviceTypeList() {}

// @Summary 创建设备类型
// @Schemes
// @Description 创建设备类型
// @Tags device-type
// @Param search body types.DeviceType true "设备类型信息"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[types.DeviceType] 返回设备类型信息
// @Router /device/type/create [post]
func noopDeviceTypeCreate() {}

// @Summary 修改设备类型
// @Schemes
// @Description 修改设备类型
// @Tags device-type
// @Param id path string true "设备类型ID"
// @Param device-type body types.DeviceType true "设备类型信息"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[types.DeviceType] 返回设备类型信息
// @Router /device/type/{id} [post]
func noopDeviceTypeUpdate() {}

// @Summary 获取设备类型
// @Schemes
// @Description 获取设备类型
// @Tags device-type
// @Param id path string true "设备类型ID"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[types.DeviceType] 返回设备类型信息
// @Router /device/type/{id} [get]
func noopDeviceTypeGet() {}

// @Summary 删除设备类型
// @Schemes
// @Description 删除设备类型
// @Tags device-type
// @Param id path string true "设备类型ID"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[types.DeviceType] 返回设备类型信息
// @Router /device/type/{id}/delete [get]
func noopDeviceTypeDelete() {}

// @Summary 导出设备类型
// @Schemes
// @Description 导出设备类型
// @Tags device-type
// @Accept json
// @Produce octet-stream
// @Router /device/type/export [get]
func noopDeviceTypeExport() {}

// @Summary 导入设备类型
// @Schemes
// @Description 导入设备类型
// @Tags device-type
// @Param file formData file true "压缩包"
// @Accept mpfd
// @Produce json
// @Success 200 {object} ReplyData[int64] 返回设备类型数量
// @Router /device/type/import [post]
func noopDeviceTypeImport() {}

func deviceTypeRouter(app *gin.RouterGroup) {

	app.POST("/count", curd.ApiCount[types.DeviceType]())
	app.POST("/search", curd.ApiSearch[types.DeviceType]())
	app.GET("/list", curd.ApiList[types.DeviceType]())
	app.POST("/create", curd.ApiCreateHook[types.DeviceType](curd.GenerateRandomId[types.DeviceType](8), nil))
	app.GET("/:id", curd.ParseParamStringId, curd.ApiGet[types.DeviceType]())
	app.POST("/:id", curd.ParseParamStringId, curd.ApiUpdateHook[types.DeviceType](nil, nil,
		"name", "desc"))
	app.GET("/:id/delete", curd.ParseParamStringId, curd.ApiDeleteHook[types.DeviceType](nil, nil))
	app.GET("/export", curd.ApiExport("device-type", "device-type"))
	app.POST("/import", curd.ApiImport("device-type"))
}
