<template>
  <div class="containers" ref="content">
    <div class="canvas" ref="canvas">
      <div class="group">
        <el-button size="medium" type="primary" @click="apply">申请</el-button>
        <el-button size="medium" type="warning" @click="audit">审核</el-button>
        <el-button size="medium" type="success">付款</el-button>
      </div>
    </div>
    <div id="js-properties-panel" class="panel"></div>
  </div>
</template>

<script>
// import BpmnViewer from 'bpmn-js'
import BpmnModeler from 'bpmn-js/lib/Modeler'
import propertiesPanelModule from 'bpmn-js-properties-panel'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'
import $ from 'jquery'

export default {
  name: 'FlowConfig',
  data () {
    return {
      bpmnModeler: null,
      overlays: null,
      elementRegistry: null,
      isAudited: 0
    }
  },
  methods: {
    createNewDiagram (bpmnModeler) {
      const bpmnXmlStr = '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_0fppxr8" targetNamespace="http://bpmn.io/schema/bpmn">\n' +
        '  <bpmn:process id="Process_1" isExecutable="false">\n' +
        '    <bpmn:startEvent id="StartEvent_1" name="填写报销申请" magic:spell="WOOO ZAAAA">\n' +
        '      <bpmn:outgoing>SequenceFlow_0nrfbee</bpmn:outgoing>\n' +
        '    </bpmn:startEvent>\n' +
        '    <bpmn:task id="Task_0ho18x0" name="主管审核">\n' +
        '      <bpmn:incoming>SequenceFlow_0nrfbee</bpmn:incoming>\n' +
        '      <bpmn:outgoing>SequenceFlow_00ho26x</bpmn:outgoing>\n' +
        '    </bpmn:task>\n' +
        '    <bpmn:task id="Task_1ymuvem" name="总监审核">\n' +
        '      <bpmn:incoming>SequenceFlow_00ho26x</bpmn:incoming>\n' +
        '      <bpmn:outgoing>SequenceFlow_18df8vb</bpmn:outgoing>\n' +
        '    </bpmn:task>\n' +
        '    <bpmn:endEvent id="EndEvent_1c0ed2n" name="出纳付款">\n' +
        '      <bpmn:incoming>SequenceFlow_18df8vb</bpmn:incoming>\n' +
        '    </bpmn:endEvent>\n' +
        '    <bpmn:sequenceFlow id="SequenceFlow_0nrfbee" sourceRef="StartEvent_1" targetRef="Task_0ho18x0" />\n' +
        '    <bpmn:sequenceFlow id="SequenceFlow_00ho26x" sourceRef="Task_0ho18x0" targetRef="Task_1ymuvem" />\n' +
        '    <bpmn:sequenceFlow id="SequenceFlow_18df8vb" sourceRef="Task_1ymuvem" targetRef="EndEvent_1c0ed2n" />\n' +
        '  </bpmn:process>\n' +
        '  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
        '    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">\n' +
        '      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">\n' +
        '        <dc:Bounds x="173" y="102" width="36" height="36" />\n' +
        '        <bpmndi:BPMNLabel>\n' +
        '          <dc:Bounds x="178" y="145" width="27" height="27" />\n' +
        '        </bpmndi:BPMNLabel>\n' +
        '      </bpmndi:BPMNShape>\n' +
        '      <bpmndi:BPMNShape id="Task_0ho18x0_di" bpmnElement="Task_0ho18x0">\n' +
        '        <dc:Bounds x="485" y="244" width="100" height="80" />\n' +
        '      </bpmndi:BPMNShape>\n' +
        '      <bpmndi:BPMNShape id="Task_1ymuvem_di" bpmnElement="Task_1ymuvem">\n' +
        '        <dc:Bounds x="712" y="391" width="100" height="80" />\n' +
        '      </bpmndi:BPMNShape>\n' +
        '      <bpmndi:BPMNShape id="EndEvent_1c0ed2n_di" bpmnElement="EndEvent_1c0ed2n">\n' +
        '        <dc:Bounds x="1056" y="568" width="36" height="36" />\n' +
        '        <bpmndi:BPMNLabel>\n' +
        '          <dc:Bounds x="1065" y="611" width="19" height="14" />\n' +
        '        </bpmndi:BPMNLabel>\n' +
        '      </bpmndi:BPMNShape>\n' +
        '      <bpmndi:BPMNEdge id="SequenceFlow_0nrfbee_di" bpmnElement="SequenceFlow_0nrfbee">\n' +
        '        <di:waypoint x="209" y="120" />\n' +
        '        <di:waypoint x="347" y="120" />\n' +
        '        <di:waypoint x="347" y="284" />\n' +
        '        <di:waypoint x="485" y="284" />\n' +
        '      </bpmndi:BPMNEdge>\n' +
        '      <bpmndi:BPMNEdge id="SequenceFlow_00ho26x_di" bpmnElement="SequenceFlow_00ho26x">\n' +
        '        <di:waypoint x="585" y="284" />\n' +
        '        <di:waypoint x="649" y="284" />\n' +
        '        <di:waypoint x="649" y="431" />\n' +
        '        <di:waypoint x="712" y="431" />\n' +
        '      </bpmndi:BPMNEdge>\n' +
        '      <bpmndi:BPMNEdge id="SequenceFlow_18df8vb_di" bpmnElement="SequenceFlow_18df8vb">\n' +
        '        <di:waypoint x="812" y="431" />\n' +
        '        <di:waypoint x="934" y="431" />\n' +
        '        <di:waypoint x="934" y="586" />\n' +
        '        <di:waypoint x="1056" y="586" />\n' +
        '      </bpmndi:BPMNEdge>\n' +
        '    </bpmndi:BPMNPlane>\n' +
        '  </bpmndi:BPMNDiagram>\n' +
        '</bpmn:definitions>\n'
      // 将字符串转换成图显示出来
      this.bpmnModeler.importXML(bpmnXmlStr, function (err) {
        if (err) {
          console.error(err)
        } else {
          // 这里还没用到这个，先注释掉吧
          // that.success()
        }
      })
    },
    // MagicPropertiesProvider (eventBus, bpmnFactory, elementRegistry) {
    //   this.getTabs = function (element) {
    //     // The "magic" tab
    //     var magicTab = {
    //       id: 'magic',
    //       label: 'Magic',
    //       groups: createMagicTabGroups(element, elementRegistry)
    //     }
    //     // All avaliable tabs
    //     return [
    //       generalTab,
    //       magicTab
    //     ]
    //   }
    // }
    /**
     * 申请
     * */
    apply () {
      this.overlays = this.bpmnModeler.get('overlays')
      this.elementRegistry = this.bpmnModeler.get('elementRegistry')
      const shape = this.elementRegistry.get('StartEvent_1')
      const $overlayHtml = $('<div class="highlight-overlay">')
        .css({width: shape.width, height: shape.height, 'border-radius': '50px'})
      this.overlays.add('StartEvent_1', { // 这里应该可以等添加事件的时候再触发
        position: {
          top: 0,
          left: 0
        },
        html: $overlayHtml
      })
    },
    audit () {
      let id = null
      let borderRadius = null
      if (!this.isAudited) {
        id = 'Task_0ho18x0'
      } else {
        id = 'Task_1ymuvem'
      }
      const shape = this.elementRegistry.get(id)
      if (shape.type.includes('Task')) {
        borderRadius = '10px'
      }
      const $overlayHtml = $('<div class="highlight-overlay">')
        .css({width: shape.width, height: shape.height, 'border-radius': borderRadius})
      this.overlays.add(id, { // 这里应该可以等添加事件的时候再触发
        position: {
          top: 0,
          left: 0
        },
        html: $overlayHtml
      })
      let element = window.document.getElementById(id)
      console.log(element)
      this.isAudited = 1
    }
  },
  mounted () {
    // 获取到属性ref为“content”的dom节点
    this.container = this.$refs.content
    // 获取到属性ref为“canvas”的dom节点
    const canvas = this.$refs.canvas

    // 建模，官方文档这里讲的很详细
    this.bpmnModeler = new BpmnModeler({
      container: canvas,
      // 添加控制板
      propertiesPanel: {
        parent: '#js-properties-panel'
      },
      additionalModules: [
        // 左边工具栏以及节点
        propertiesProviderModule,
        // 右边的工具栏
        propertiesPanelModule
      ],
      moddleExtensions: {
        camunda: camundaModdleDescriptor
      }
    })
    this.createNewDiagram(this.bpmnModeler)
  }
}
</script>

<style scoped>
.group {
  display: inline-flex;
  flex-wrap: nowrap;
  justify-content: center;
  width: 100%;
  margin: 15px;
}
</style>
