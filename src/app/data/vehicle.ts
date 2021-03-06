export class Vehicle {
  vin = '';
  consignmentType = '';
  batchId = '';
  source = '';
  mofcomRegisterType = '';
  mofcomRegisterRef = '';
  entranceDate = '';
  facility = '';
  internalSurveyor = '';
  isSurveyNecessary = true;
  surveyRounds = 'two';
  estimatedSurveyDateFirst = '';
  estimatedSurveyDateSecond = '';
  vtbmym = '';
  // dismantling = false;
  status2 = {
    isDismantlingReady: false,
    isDismantlingNotReadyReason: '收车流程进行中。',
    isDismantlingNotReadySince: '',
    isDismantlingNotReadyTill: '',
    isSurveyReady: false,
    isSurveyNotReadyReason: '收车流程进行中。',
    isSurveyNotReadySince: '',
    isSurveyNotReadyTill: '',
    dismantlingOrderId: ''
    // surveyPending: false,
    // surveyPendingReason: '',
    // surveyPendingSince: '',
    // surveyPendingTill: '',
    // dismantlingPending: false,
    // dismantlingPendingReason: '',
    // dismantlingPendingSince: '',
    // dismantlingPendingTill: '',
    // auctioning: false,
    // dismantling: false
  };
  remarks = [];
  metadata = {
    isDeleted: false,
    deletedFor: '',
    deletedBy: '',
    deletedAt: '',
    // createdAt: '',
    // createdBy: '',
    // lastModifiedAt: '',
    // lastModifiedBy: ''
  };
  owner = {
    name: '',
    address: '',
    zipCode: '',
    idType: '',
    idOtherTypeName: '',
    idNo: '',
    tel: '',
    isPerson: true,
    isByAgent: false
  };
  agent = {
    name: '',
    idType: '',
    idOtherTypeName: '',
    idNo: '',
    // tel: ''
  };
  vehicle = {
    plateNo: '',
    vehicleType: '',
    useCharacter: '',
    brand: '',
    model: '',
    conditionOnEntrance: '',
    residualValueBeforeFD: '',
    engineNo: '',
    registrationDate: '',
    curbWeightKG: '',
    totalMassKG: '',
    lengthOverallMM: '',
    color: '',
    aquisitionType: '',
    aquisitionOtherTypeDetail: '',
    // displacementL: '',
    displacementML: '',
    fuelType: '',
    seats: '',
    isNEV: false,
    batterySlotCount: ''
  };
  feesAndDeductions = [];
  vehicleCosts = [];
  docsProvided = {
    vRegistrationCert: false,
    vLicenseA: false,
    vLicenseB: false,
    plateCount: '',
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
    // preDismantling: {
    //   done: false,
    //   date: ''
    // },
    firstSurvey: {
      done: false,
      date: ''
    },
    secondSurvey: {
      done: false,
      date: ''
    },
    dismantled: {
      // ref: '',
      done: false,
      date: ''
    },
    sold: {
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