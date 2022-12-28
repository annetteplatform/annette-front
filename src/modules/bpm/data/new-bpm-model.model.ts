import {BpmModel, Notation} from './bpm-model.model'

export function newBpmnModel(): BpmModel {
  return {
    id: '',
    name: '',
    description: '',
    notation: Notation.BPMN,
    code: 'Process_1',
    xml: '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:modeler="http://camunda.org/schema/modeler/1.0" id="Definitions_0pfghbz" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="4.11.1" modeler:executionPlatform="Camunda Platform" modeler:executionPlatformVersion="7.15.0">\n' +
      '  <bpmn:process id="Process_1" isExecutable="true">\n' +
      '    <bpmn:startEvent id="StartEvent_1" />\n' +
      '  </bpmn:process>\n' +
      '  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
      '    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">\n' +
      '      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">\n' +
      '        <dc:Bounds x="179" y="79" width="36" height="36" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '    </bpmndi:BPMNPlane>\n' +
      '  </bpmndi:BPMNDiagram>\n' +
      '</bpmn:definitions>\n',
  }
}

export function newDmnModel(): BpmModel {
  return {
    id: '',
    name: '',
    description: '',
    notation: Notation.DMN,
    code: 'Decision_1',
    xml: '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<definitions xmlns="https://www.omg.org/spec/DMN/20191111/MODEL/" xmlns:dmndi="https://www.omg.org/spec/DMN/20191111/DMNDI/" xmlns:dc="http://www.omg.org/spec/DMN/20180521/DC/" id="Definitions_1seqxcv" name="DRD" namespace="http://camunda.org/schema/1.0/dmn" exporter="Camunda Modeler" exporterVersion="4.11.1">\n' +
      '  <decision id="Decision_1" name="Decision 1">\n' +
      '    <decisionTable id="DecisionTable_14gwh4m">\n' +
      '      <input id="Input_1">\n' +
      '        <inputExpression id="InputExpression_1" typeRef="string">\n' +
      '          <text></text>\n' +
      '        </inputExpression>\n' +
      '      </input>\n' +
      '      <output id="Output_1" typeRef="string" />\n' +
      '    </decisionTable>\n' +
      '  </decision>\n' +
      '  <dmndi:DMNDI>\n' +
      '    <dmndi:DMNDiagram>\n' +
      '      <dmndi:DMNShape dmnElementRef="Decision_1">\n' +
      '        <dc:Bounds height="80" width="180" x="160" y="100" />\n' +
      '      </dmndi:DMNShape>\n' +
      '    </dmndi:DMNDiagram>\n' +
      '  </dmndi:DMNDI>\n' +
      '</definitions>\n',
  }
}

export function newCmmnModel(): BpmModel {
  return {
    id: '',
    name: '',
    description: '',
    notation: Notation.CMMN,
    code: 'Case_1',
    xml: '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<cmmn:definitions xmlns:dc="http://www.omg.org/spec/CMMN/20151109/DC" xmlns:cmmndi="http://www.omg.org/spec/CMMN/20151109/CMMNDI" xmlns:cmmn="http://www.omg.org/spec/CMMN/20151109/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="Definitions_0511ij3" targetNamespace="http://bpmn.io/schema/cmmn" exporter="Camunda Modeler" exporterVersion="4.11.1">\n' +
      '  <cmmn:case id="Case_1">\n' +
      '    <cmmn:casePlanModel id="CasePlanModel_0m1synu" name="A CasePlanModel">\n' +
      '      <cmmn:planItem id="PlanItem_1" definitionRef="Task_1" />\n' +
      '      <cmmn:task id="Task_1" />\n' +
      '    </cmmn:casePlanModel>\n' +
      '  </cmmn:case>\n' +
      '  <cmmndi:CMMNDI>\n' +
      '    <cmmndi:CMMNDiagram id="CMMNDiagram_1">\n' +
      '      <cmmndi:Size width="500" height="500" />\n' +
      '      <cmmndi:CMMNShape id="DI_CasePlanModel_0m1synu" cmmnElementRef="CasePlanModel_0m1synu">\n' +
      '        <dc:Bounds x="154" y="99" width="534" height="389" />\n' +
      '        <cmmndi:CMMNLabel />\n' +
      '      </cmmndi:CMMNShape>\n' +
      '      <cmmndi:CMMNShape id="PlanItem_1_di" cmmnElementRef="PlanItem_1">\n' +
      '        <dc:Bounds x="190" y="132" width="100" height="80" />\n' +
      '        <cmmndi:CMMNLabel />\n' +
      '      </cmmndi:CMMNShape>\n' +
      '    </cmmndi:CMMNDiagram>\n' +
      '  </cmmndi:CMMNDI>\n' +
      '</cmmn:definitions>',
  }
}
