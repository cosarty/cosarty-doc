<template>
  <div class="project-container">
    <div class="project-items" v-for="(items, key) in infoList" :key="key">
      <UseElementVisibility
        #default="{ isVisible }"
        class="project-info"
        v-for="(it, i) in items"
        :key="i"
      >
        <div :class="{ active: isVisible }" class="box-info">
          <template v-if="i === 'name'">
            <div class="title header">{{ it }}</div>
          </template>
          <template v-else>
            <div class="box">
              <template v-if="Array.isArray(it)">
                <div class="title">{{ keyMap[i] }}:</div>
                <div class="arr">
                  <div v-for="(text, id) in it" :key="id">
                    {{ id + 1 }}. &nbsp;{{ text }}
                  </div>
                </div>
              </template>
              <div :class="i" v-else>
                <span class="title">{{ keyMap[i] }} :</span
                ><template v-if="it?.startsWith('http')"
                  ><a :href="it">{{ it }}</a></template
                ><span v-else>{{ it }}</span>
              </div>
            </div>
          </template>
        </div>
      </UseElementVisibility>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { UseElementVisibility } from '../../../composables/useIntersectionObserver'
interface ProjectImp {
  name?: string //项目名称
  address?: string // 地址
  general?: string // 概况
  frame?: string // 框架相关
  backEnd?: string // 后端技术
  library?: string // 库相关
  competency?: string //职能
  target?: string[] | string // 目标
}

const keyMap: ProjectImp = {
  address: '地址',
  general: '项目概况',
  frame: '框架相关',
  backEnd: '后端相关',
  library: '相关库',
  competency: '职能',
  target: '项目目标',
}

const infoList = reactive<ProjectImp[]>([
  {
    name: '易直播管理后台-跨境分支',
    general:
      '该项目主要是给生以及教师用户，提供一个sass平台的考试服务，支持局域网部署，系统分为三端（管理员端，学生端，教师端）',
    frame: 'vue2，vue-router，vuex，elementUI，axios',

    library: 'loadsh，draggable 等',
    competency: '负责该系统的106个模块的bug修订，以及14个新模块的重构模块',
    target: [
      '根据出题人的出题报告，还原成答题模块',
      '封装公共关键词组件，提高几十个模块的开发效率',
      '修订所有跨境分支bug',
      '封装动态表格组件，支持任意层级，任意规则的答题形式',
      '封装拖拽答题组件，实现题目的拖拉拽的答题形式，提高答题的效率',
    ],
  },
  {
    name: 'psd解析工具（工具库）',
    general:
      '为了提高公司的生产效率，开发psd模版解析工具，封装成独立npm包，支持psd文件导入。',
    frame: ' psdjs，javascript',
    target: [
      '对公司现有模版规则，进行重新定义，规范psd命名规则',
      '通过抽离Layer类和Group类，进行图层解耦，将单图层和图层组的逻辑进行分离',
      '将模版控件(文本控件，图片控件，二维码控件等)抽离到不同的功能类中，大幅提高工具的可用性以及健壮性',
      '提供一系列可配置的正则规则，可以让使用者自定义模版的命名协议',
      '对不同的错误场景封装公共的错误提示规则',
      '实现psd图片懒加载，当psd解析无误时需要用户手动调用图片解析规则',
    ],
  },
  {
    name: '商户助手小程序',
    general:
      '该项目为商户提供了一体化的价签管理，功能包含了扫码绑定，扫码解绑，模版绑定，营销投放等功能',
    frame: 'vue3，typescript，uniapp，uview，vuex',
    competency:
      '开发素材中心，海报商城，设备模版，门店模版，个人中心等多个主要模块编写，抽离项目功能逻辑 提高团队开发速度',
    target: [
      '抽离公共的分页hook，提高整个项目的效率',
      '封装扫码逻辑和公共弹框提高项目的复用率',
      '封装公共展示组件，根据不同的页面使用不同的排版规则',
      '根据 UI 设计稿，完美还原设计稿',
    ],
  },
  {
    name: '智能会议管理系统',
    general:
      '该项目主要对不同门店下的不同会议室，进行分层管理预约，主要实现门牌使用的可视化展示，不同门店下的会议室预约，会议室的管理，以及会议预约，预约人员，用户管理权限等模块的开发',
    frame: 'react17，umijs，antdPro',

    library: 'loadsh，momen',
    competency: '负责该系统的前端模块',
    target: [
      '设计项目的权限架构实现门店和用户登录之间的权限管理',
      '使用jsxlsx 对excel表格进行加载加工',
      '封装可视化组件实现会议室预约时间段的展示',
      '实现预约人员和部门的组织架构展示',
      '对不同会议室不同时间段的预约情况进行控制',
      '实现会议室模块，会议预约模块,人员管理模块，权限管理模块，设备绑定模块',
    ],
  },
  {
    name: 'Inc Pro(交换机管理系统)',
    general: '交换机管理系统对交换机的数据，网关，策略，流量，性能进行管控',
    frame: 'vue2.6，elementUI，Vux，vue-router',
    library: 'vinyl-fs',
    competency: '负责该系统的国际化改造',
    target: [
      '调研国际化方案-i18n',
      '编写全局函数实现国际化key切换',
      '对不同文件(js,vue)下的国际化方案采用不同的规则',
      '编写国际化脚本自动提取国际化文本到json文件中',
      '实现不同语言下的样式隔离(国外语言过长导致样式错位问题)',
    ],
  },
  {
    name: '试题君',
    address: 'https://github.com/cosarty/yourdocument',
    general:
      '一个题目管理兼交流论坛的系统，校内师生可以在此系统上进行题目发布交流，支持多题型，富文本题型，以及组卷，下载试卷，创建组织，浏览记录，评论记录等功能，系统三级权限架构设计，超级管理员，管理员，普通用户,项目的题目图片等静态文件统一上传到oss上进行管理，集成了邮箱服务，评论和题目审核均会发送邮件通知',
    frame: 'ract17，umi4，antdpro，typescript',
    backEnd: 'express，mongoDB',
    library: 'html2canvas，jspdf，rc-util,ali-oss，mongoose，xss，nodemailer',
    competency: '项目的数据表设计，ui设计，前后端架构',
    target: [
      '使用jspdf+ html2canvas实现试卷下载',
      '使用rc-util, ali-oss实现剪切板上传oss',
      'Nodemailer 提供邮箱服务支持',
      '多题型库表设计',
      '超级管理员和管理员的权限框架设计',
      '封装公共试卷组件，，提高出题的复用性',
      '使用express以及MongoDB来做服务端支持',
    ],
  },
])
</script>

<style lang="scss" scoped>
.project {
  &-container {
  }

  &-items {
  }

  &-info {
    padding-left: 10px;
    line-height: 1.7;
    @media screen and (max-width: 650px) {
      padding-left: 0;
    }

    .box-info {
      transform: translateX(150%);
      opacity: 0;
      transition: all 0.5s ease 0.3s;
      &.active {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .title {
      color: #414141;
      font-weight: 600;
      min-width: max-content;
      margin-right: 7px;

      &.header {
        font-size: 18px;
        margin-bottom: 12px;
        @media screen and (max-width: 650px) {
          margin-bottom: 6px;
        }
      }
    }

    .box {
      padding-left: 60px;
      position: relative;
      @media screen and (max-width: 650px) {
        padding-left: 15px;
      }

      &::before {
        position: absolute;
        content: '';
        width: 6px;
        height: 1px;
        right: calc(100% - 50px);
        top: 12px;
        background-color: #414141;
      }

      .arr {
        padding-left: 32px;
        @media screen and (max-width: 650px) {
          padding-left: 15px;
        }
      }
    }
  }
}
</style>
