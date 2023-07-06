package types

import (
	"github.com/zgwit/iot-master/v3/model"
	"time"
)

type Device struct {
	model.Device `xorm:"extends"`
	TypeId       string `json:"type_id,omitempty" xorm:"index"`  //类型
	AreaId       string `json:"area_id,omitempty" xorm:"index"`  //区域
	GroupId      string `json:"group_id,omitempty" xorm:"index"` //分组
	Type         string `json:"type,omitempty" xorm:"<-"`
	Area         string `json:"area,omitempty" xorm:"<-"`
	Group        string `json:"group,omitempty" xorm:"<-"`
}

type DeviceType struct {
	Id      string    `json:"id" xorm:"pk"`
	Name    string    `json:"name"`
	Desc    string    `json:"desc,omitempty"`
	Created time.Time `json:"created,omitempty" xorm:"created"`
}

type DeviceArea struct {
	Id      string    `json:"id" xorm:"pk"`
	Name    string    `json:"name"`
	Desc    string    `json:"desc,omitempty"`
	Created time.Time `json:"created" xorm:"created"`
}

type DeviceGroup struct {
	Id      string    `json:"id" xorm:"pk"`
	AreaId  string    `json:"area_id" xorm:"index"`
	Name    string    `json:"name"`
	Desc    string    `json:"desc,omitempty"`
	Created time.Time `json:"created" xorm:"created"`
}
