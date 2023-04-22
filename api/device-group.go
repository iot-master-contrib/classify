package api

import (
	"classify/types"
	"github.com/gin-gonic/gin"
	"github.com/zgwit/iot-master/v3/pkg/curd"
)

// @Summary 查询分组数量
// @Schemes
// @Description 查询分组数量
// @Tags device-group
// @Param search body ParamSearch true "查询参数"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[int64] 返回分组数量
// @Router /device/group/count [post]
func noopDeviceGroupCount() {}

// @Summary 查询分组
// @Schemes
// @Description 查询分组
// @Tags device-group
// @Param search body ParamSearch true "查询参数"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyList[types.DeviceGroup] 返回分组信息
// @Router /device/group/search [post]
func noopDeviceGroupSearch() {}

// @Summary 查询分组
// @Schemes
// @Description 查询分组
// @Tags device-group
// @Param search query ParamList true "查询参数"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyList[types.DeviceGroup] 返回分组信息
// @Router /device/group/list [get]
func noopDeviceGroupList() {}

// @Summary 创建分组
// @Schemes
// @Description 创建分组
// @Tags device-group
// @Param search body types.DeviceGroup true "分组信息"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[types.DeviceGroup] 返回分组信息
// @Router /device/group/create [post]
func noopDeviceGroupCreate() {}

// @Summary 修改分组
// @Schemes
// @Description 修改分组
// @Tags device-group
// @Param id path string true "分组ID"
// @Param device-group body types.DeviceGroup true "分组信息"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[types.DeviceGroup] 返回分组信息
// @Router /device/group/{id} [post]
func noopDeviceGroupUpdate() {}

// @Summary 获取分组
// @Schemes
// @Description 获取分组
// @Tags device-group
// @Param id path string true "分组ID"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[types.DeviceGroup] 返回分组信息
// @Router /device/group/{id} [get]
func noopDeviceGroupGet() {}

// @Summary 删除分组
// @Schemes
// @Description 删除分组
// @Tags device-group
// @Param id path string true "分组ID"
// @Accept json
// @Produce json
// @Success 200 {object} ReplyData[types.DeviceGroup] 返回分组信息
// @Router /device/group/{id}/delete [get]
func noopDeviceGroupDelete() {}

// @Summary 导出分组
// @Schemes
// @Description 导出分组
// @Tags device-group
// @Accept json
// @Produce octet-stream
// @Router /device/group/export [get]
func noopDeviceGroupExport() {}

// @Summary 导入分组
// @Schemes
// @Description 导入分组
// @Tags device-group
// @Param file formData file true "压缩包"
// @Accept mpfd
// @Produce json
// @Success 200 {object} ReplyData[int64] 返回分组数量
// @Router /device/group/import [post]
func noopDeviceGroupImport() {}

func deviceGroupRouter(app *gin.RouterGroup) {

	app.POST("/count", curd.ApiCount[types.DeviceGroup]())
	app.POST("/search", curd.ApiSearch[types.DeviceGroup]())
	app.GET("/list", curd.ApiList[types.DeviceGroup]())
	app.POST("/create", curd.ApiCreateHook[types.DeviceGroup](curd.GenerateRandomId[types.DeviceGroup](8), nil))
	app.GET("/:id", curd.ParseParamStringId, curd.ApiGet[types.DeviceGroup]())
	app.POST("/:id", curd.ParseParamStringId, curd.ApiUpdateHook[types.DeviceGroup](nil, nil,
		"name", "desc", "area_id"))
	app.GET("/:id/delete", curd.ParseParamStringId, curd.ApiDeleteHook[types.DeviceGroup](nil, nil))
	app.GET("/export", curd.ApiExport[types.DeviceGroup]("device-group"))
	app.POST("/import", curd.ApiImport[types.DeviceGroup]())
}
