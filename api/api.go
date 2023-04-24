package api

import "github.com/gin-gonic/gin"

func RegisterRoutes(app *gin.RouterGroup) {

	deviceRouter(app.Group("/device"))

	deviceAreaRouter(app.Group("/device/area"))

	deviceGroupRouter(app.Group("/device/group"))

	deviceTypeRouter(app.Group("/device/type"))

}
