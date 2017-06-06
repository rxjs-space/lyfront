export class Vehicle {
  id = '';
  isToDeregister = true;
  batchId = '';
  mofcomRegisterType = null;
  mofcomRegisterType1 = '';
  mofcomRegisterRef = '';
  entranceDate = (new Date()).toISOString().slice(0, 10);
  remarks = [];
  metadata = {
    isDeleted: false,
    deletedFor: '',
    deletedBy: '',
    deletedAt: '',
    createdAt: '',
    createdBy: '',
    lastModifiedAt: '',
    lastModifiedBy: ''
  };
  owner = {
    name: '',
    address: '',
    zipCode: '',
    idType: null,
    idOtherTypeName: '',
    idNo: '',
    tel: '',
    isPerson: true,
    isRemote: '',
    isByAgent: ''
  };
  agent = {
    name: '',
    idType: null,
    idOtherTypeName: '',
    idNo: '',
    tel: ''
  };
  vehicle = {
    plateNo: '',
    vehicleType: null,
    useCharacter: null,
    brand: null,
    model: '',
    conditionOnEntrance: '',
    residualValueBeforeFD: 0,
    engineNo: '',
    registrationDate: '',
    totalMassKG: 0,
    lengthOverallMM: 0,
    color: '',
    aquisitionType: null,
    aquisitionOtherTypeDetail: '',
    displacementL: '',
    fuelType: null,
    seats: 0,
    isNEV: false
  };
  feesAndDeductions = [];
  vehicleCosts = [];
  docsProvided = {
    vRegistrationCert: false,
    vLicenseA: false,
    vLicenseB: false,
    plateCount: 0,
    infoQueryForm: false,
    ownerOIdCopy: false,
    ownerPIdCopy: false,
    agentIdCopy: false,
    registrationTransferDeregistrationApplication: false,
    surveyRecords: false,
    powerOfAttorney: false,
    orgDeregistrationFormCopy: false,
    orgRenamingDoc: false,
    statementOfLossOnNewspaper: false,
    ownershipCert: false,
    affiliationAgreement: false,
    others: ''
  };
  status = {
    ownerDocsReady: {
      done: false,
      date: ''
    },
    platesCollectedByOwner: {
      done: false,
      date: ''
    },
    rubbing: {
      done: false,
      date: ''
    },
    photosOnEntrance: {
      done: false,
      date: ''
    },
    photosAfterCuttingUp: {
      done: false,
      date: ''
    },
    policeSiteEntry: {
      done: false,
      date: ''
    },
    mofcomEntry: {
      done: false,
      date: ''
    },
    mofcomCertReady: {
      done: false,
      date: ''
    },
    mofcomCertCollectedByOwnerAndSigned: {
      done: false,
      date: ''
    },
    firstSurvey: {
      done: false,
      date: ''
    },
    secondSurvey: {
      done: false,
      date: ''
    },
    dismantled: {
      done: false,
      date: ''
    }
  };

}



/*

    {
      "id": "ABCD12345678",
      "isToDeregister": true,
      "batchId": "",
      "mofcomRegisterType": {
        "id": "1",
        "name": "正常"
      },
      "mofcomRegisterRef": "HS-210000-1045-20170601-102",
      "entranceDate": "2017-05-03",
      "remarks": [
        {
          "content": "abc",
          "date": "2017-05-03",
          "by": "longyun8"
        }
      ],
      "metadata": {
        "isDeleted": false,
        "deletedFor": "车主取消拆解",
        "deletedBy": "",
        "deletedAt": "",
        "createdAt": "",
        "createdBy": "",
        "lastModifiedAt": "",
        "lastModifiedBy": ""
      },
      "owner": {
        "name": "车飞豹",
        "address": "双塔区",
        "zipCode": "122000",
        "idType": {
          "id": "p1",
          "name": "身份证"
        },
        "idOtherTypeName": "",
        "idNo": "211302200001011230",
        "tel": "13804210421",
        "isPerson": true,
        "isRemote": false,
        "isByAgent": true
      },
      "agent": {
        "name": "建永辉",
        "idType": {
          "id": "p1",
          "name": "身份证"
        },
        "idOtherTypeName": "",
        "idNo": "211302200001011231",
        "tel": "13904210421"
      },
      "vehicle": {
        "plateNo": "辽N12345",
        "vehicleType": {
          "id": "1",
          "name": "小型轿车"
        },
        "useCharacter": {
          "id": "1",
          "name": "非营运"
        },
        "brand": {
          "id": 11,
          "name": "马自达"
        },
        "model": "xyz123",
        "conditionOnEntrance": "完好，无氟，少量废油。",
        "residualValueBeforeFD": 500,
        "engineNo": "001123",
        "registrationDate": "2009-05-01",
        "totalMassKG": 1450,
        "lengthOverallMM": 4500,
        "color": "红/灰",
        "aquisitionType": {
          "id": "1",
          "name": "购买"
        },
        "aquisitionOtherTypeDetail": "",
        "displacementL": 10,
        "fuelType": {
          "id": "1",
          "name": "汽油"
        },
        "seats": 5,
        "isNEV": false
      },
      "feesAndDeductions": [
        {
          "type": {
            "id": "2",
            "name": "拖车费"
          },
          "part": null,
          "details": "起点：豪德",
          "amount": 100
        },
        {
          "type": {
            "id": "1",
            "name": "零件遗失"
          },
          "part": null,
          "details": null,
          "amount": 100
        },
        {
          "type": {
            "id": "3",
            "name": "其他"
          },
          "part": null,
          "details": "说明抵扣原因",
          "amount": 100
        }
      ],
      "vehicleCosts": [
        {
          "type": {
            "id": "2",
            "name": "回收人员工时费"
          },
          "details": "",
          "amount": 0
        },
        {
          "type": {
            "id": "3",
            "name": "拖车费（未抵扣）"
          },
          "details": "",
          "amount": 50
        },
        {
          "type": {
            "id": "4",
            "name": "其他成本"
          },
          "details": "asdfjklasdfk;klj",
          "amount": 100
        }
      ],
      "docsProvided": {
        "vRegistrationCert": true,
        "vLicenseA": true,
        "vLicenseB": true,
        "plateCount": 2,
        "infoQueryForm": false,
        "ownerOIdCopy": false,
        "ownerPIdCopy": true,
        "agentIdCopy": true,
        "registrationTransferDeregistrationApplication": false,
        "surveyRecords": false,
        "powerOfAttorney": false,
        "orgDeregistrationFormCopy": false,
        "orgRenamingDoc": false,
        "statementOfLossOnNewspaper": false,
        "ownershipCert": false,
        "affiliationAgreement": false,
        "others": ""
      },
      "status": {
        "ownerDocsReady": {
          "done": false,
          "date": ""
        },
        "platesCollectedByOwner": {
          "done": true,
          "date": "2017-06-02"
        },
        "rubbing": {
          "done": true,
          "date": "2017-06-02"
        },
        "photosOnEntrance": {
          "done": true,
          "date": "2017-06-02"
        },
        "photosAfterCuttingUp": {
          "done": true,
          "date": "2017-06-02"
        },
        "policeSiteEntry": {
          "done": true,
          "date": "2017-06-02"
        },
        "mofcomEntry": {
          "done": true,
          "date": "2017-06-02",
          "ref": "xyz2017-5-6-1"
        },
        "mofcomCertReady": {
          "done": true,
          "date": "2017-06-02"
        },
        "mofcomCertCollectedByOwnerAndSigned": {
          "done": true,
          "date": "2017-06-02"
        },
        "firstSurvey": {
          "done": true,
          "date": "2017-06-02"
        },
        "secondSurvey": {
          "done": false,
          "date": "2017-06-02"
        },
        "dismantled": {
          "done": false,
          "date": "2017-06-02"
        }
      }
    },


*/