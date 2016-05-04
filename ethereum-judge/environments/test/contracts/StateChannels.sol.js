// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":false,"inputs":[{"name":"hash","type":"bytes32"},{"name":"sig","type":"bytes"},{"name":"signer","type":"address"}],"name":"ecverify","outputs":[{"name":"b","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"channelId","type":"bytes32"},{"name":"state","type":"bytes"},{"name":"signature","type":"bytes"},{"name":"participant","type":"uint8"}],"name":"addEvidenceTx","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"hash","type":"bytes32"},{"name":"sig","type":"bytes"}],"name":"ecrecovery","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"channelId","type":"bytes32"},{"name":"sequenceNumber","type":"uint256"},{"name":"state","type":"bytes"},{"name":"signature0","type":"bytes"},{"name":"signature1","type":"bytes"}],"name":"addUpdateTx","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"channelId","type":"bytes32"}],"name":"getChannel","outputs":[{"name":"addr0","type":"address"},{"name":"addr1","type":"address"},{"name":"phase","type":"uint8"},{"name":"challengePeriod","type":"uint256"},{"name":"closingBlock","type":"uint256"},{"name":"state","type":"bytes"},{"name":"sequenceNumber","type":"uint256"},{"name":"evidence0","type":"bytes"},{"name":"evidence1","type":"bytes"}],"type":"function"},{"constant":false,"inputs":[{"name":"channelId","type":"bytes32"},{"name":"signature","type":"bytes"},{"name":"participant","type":"uint8"}],"name":"addClosingTx","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"channelId","type":"bytes32"},{"name":"addr0","type":"address"},{"name":"addr1","type":"address"},{"name":"state","type":"bytes"},{"name":"challengePeriod","type":"uint256"},{"name":"signature0","type":"bytes"},{"name":"signature1","type":"bytes"}],"name":"addChannel","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"channelId","type":"bytes32"}],"name":"getChannelState","outputs":[{"name":"","type":"bytes"}],"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"message","type":"string"}],"name":"Error","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"label","type":"string"},{"indexed":false,"name":"message","type":"string"}],"name":"LogString","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"label","type":"string"},{"indexed":false,"name":"message","type":"bytes"}],"name":"LogBytes","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"label","type":"string"},{"indexed":false,"name":"message","type":"bytes32"}],"name":"LogBytes32","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"num","type":"uint256"}],"name":"LogNum256","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"num","type":"uint8"}],"name":"LogNum","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"b","type":"bool"}],"name":"LogBool","type":"event"}],
    binary: "6060604052611910806100126000396000f36060604052361561006c5760e060020a600035046339cdde32811461006e57806366a2b472146100d057806377d32e94146101d25780637c01e46f14610239578063831c2b821461037b5780639b83cd2514610445578063c8662b5d14610505578063d18da8b1146106e2575b005b60408051602060248035600481810135601f810185900485028601850190965285855261075d958135959194604494929390920191819084018382808284375094965050933593505050505b600081600160a060020a0316610a45858561021c565b60408051602060248035600481810135601f810185900485028601850190965285855261006c9581359591946044949293909201918190840183828082843750506040805160209735808a0135601f81018a90048a0283018a0190935282825296989760649791965060249190910194509092508291508401838280828437509496505093359350505050600084815260208190526040812060029081015460a060020a900460ff16141561162557604080516020808252600e908201527f6368616e6e656c20636c6f7365640000000000000000000000000000000000008183015290516000805160206118f08339815191529181900360600190a16117e3565b60408051602060248035600481810135601f810185900485028601850190965285855261076f95813595919460449492939092019181908401838280828437509496505050505050505b600060006000600084516041141515610965575b50505092915050565b604080516020604435600481810135601f810184900484028501840190955284845261006c948135946024803595939460649492939101918190840183828082843750506040805160209735808a0135601f81018a90048a0283018a0190935282825296989760849791965060249091019450909250829150840183828082843750506040805160209735808a0135601f81018a90048a0283018a0190935282825296989760a4979196506024919091019450909250829150840183828082843750949650505050505050600085815260208190526040812060029081015460a060020a900460ff1614156110ad57604080516020808252600e908201527f6368616e6e656c20636c6f7365640000000000000000000000000000000000008183015290516000805160206118f08339815191529181900360600190a16110a5565b61078c600435604080516020818101835260008083528351808301855281815284518084018652828152868352828452855186842060018181015460028381015460038501546004860154600596909601805495861615610100026000190190951692909204601f81018b90048b0287018b01909c528b8652600160a060020a039283169b9281169a60a060020a90910460ff1699919894979096949590949390929091830182828015610af35780601f10610ac857610100808354040283529160200191610af3565b60408051602060248035600481810135601f810185900485028601850190965285855261006c9581359591946044949293909201918190840183828082843750949650509335935050505060008381526020819052604081206002015460a060020a900460ff168114611539576040805160208082526010908201527f6368616e6e656c206e6f74206f70656e000000000000000000000000000000008183015290516000805160206118f08339815191529181900360600190a1611533565b604080516020606435600481810135601f810184900484028501840190955284845261006c948135946024803595604435956084949201919081908401838280828437505060408051602060a435808b0135601f810183900483028401830190945283835297999835989760c4975091955060249190910193509091508190840183828082843750506040805160209735808a0135601f81018a90048a0283018a0190935282825296989760e49791965060249190910194509092508291508401838280828437509496505050505050506040805160208181018352600080835283518083018552818152845161014081018652828152808401839052808601839052606081018390526080810183905260a081018390528551808501875283815260c082015260e0810183905285518085018752838152610100820152855180850187528381526101208201528c83529282905293812054909391908b1415610c5a57604080516020808252602a908201527f6368616e6e656c20776974682074686174206368616e6e656c496420616c7265818301527f6164792065786973747300000000000000000000000000000000000000000000606082015290516000805160206118f08339815191529181900360800190a1610c4d565b6108f76004356040805160208181018352600080835284815280825283902060050180548451601f600260001961010060018616150201909316929092049182018490048402810184019095528085529293929091830182828015610abc5780601f10610a9157610100808354040283529160200191610abc565b60408051918252519081900360200190f35b60408051600160a060020a03929092168252519081900360200190f35b604051808a600160a060020a0316815260200189600160a060020a031681526020018860ff1681526020018781526020018681526020018060200185815260200180602001806020018481038452888181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f16801561082d5780820380516001836020036101000a031916815260200191505b508481038352868181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156108865780820380516001836020036101000a031916815260200191505b508481038252858181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156108df5780820380516001836020036101000a031916815260200191505b509c5050505050505050505050505060405180910390f35b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156109575780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b50506040805160208581015186840151604188015160ff81168552945191955093927f6eb4dfa3aaaccfd9808ba31f45f31c585da5460677f6491f773cba39ee872c3492908290030190a1601b8160ff1610156109c057601b015b6040805160ff8316815290517f6eb4dfa3aaaccfd9808ba31f45f31c585da5460677f6491f773cba39ee872c349181900360200190a1600186828585604051808581526020018460ff1681526020018381526020018281526020019450505050506020604051808303816000866161da5a03f115610002575050604051519350610230565b600160a060020a031614905080507fc33356bc2bad2ce263b056da5d061d4e89c336823d5e77f14c1383aedb7a1b3a816040518082815260200191505060405180910390a19392505050565b820191906000526020600020905b815481529060010190602001808311610a9f57829003601f168201915b50505050509050919050565b820191906000526020600020905b815481529060010190602001808311610ad657829003601f168201915b50505060008d8152602081815260408051928190206006810154600791909101805460026001821615610100026000190190911604601f8101859004850286018501909352828552969a50985091949350909150830182828015610b985780601f10610b6d57610100808354040283529160200191610b98565b820191906000526020600020905b815481529060010190602001808311610b7b57829003601f168201915b50505060008d815260208181526040805192819020600801805460026001821615610100026000190190911604601f810184900484028501840190925281845295975091949350909150830182828015610c335780601f10610c0857610100808354040283529160200191610c33565b820191906000526020600020905b815481529060010190602001808311610c1657829003601f168201915b50939450505050509193959799909294969850565b505050505b5050505050505050505050565b8a8a8a8a60405180807f6164644368616e6e656c00000000000000000000000000000000000000000000815260200150600a0185815260200184600160a060020a03166c0100000000000000000000000002815260140183600160a060020a03166c010000000000000000000000000281526014018280519060200190808383829060006004602084601f0104600f02600301f15090500194505050505060405180910390209350610d0d84878c6100ba565b1515610d66576040805160208082526012908201527f7369676e61747572653020696e76616c696400000000000000000000000000008183015290516000805160206118f08339815191529181900360600190a1610c4d565b610d7184868b6100ba565b1515610dca576040805160208082526012908201527f7369676e61747572653120696e76616c696400000000000000000000000000008183015290516000805160206118f08339815191529181900360600190a1610c4d565b610140604051908101604052808c81526020018b81526020018a815260200160008152602001888152602001600081526020018981526020016000815260200184815260200183815260200150905080600060005060008d81526020019081526020016000206000506000820151816000016000505560208201518160010160006101000a815481600160a060020a030219169083021790555060408201518160020160006101000a815481600160a060020a030219169083021790555060608201518160020160146101000a81548160ff021916908302179055506080820151816003016000505560a0820151816004016000505560c0820151816005016000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610f2d57805160ff19168380011785555b50610f5d9291505b80821115610fca5760008155600101610f19565b82800160010185558215610f11579182015b82811115610f11578251826000505591602001919060010190610f3f565b505060e08201518160060160005055610100820151816007016000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610fce57805160ff19168380011785555b50610ffe929150610f19565b5090565b82800160010185558215610fbe579182015b82811115610fbe578251826000505591602001919060010190610fe0565b5050610120820151816008016000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061105e57805160ff19168380011785555b50610c48929150610f19565b82800160010185558215611052579182015b82811115611052578251826000505591602001919060010190611070565b505060008681526020819052604090206006018590555b505050505050565b85858560405180807f75706461746554780000000000000000000000000000000000000000000000008152602001506008018481526020018381526020018280519060200190808383829060006004602084601f0104600f02600301f1509050019350505050604051809103902090507f02d93529bba9d141e5e06733c52c7e6fbcb1149586adb5c24064b522ab26f1d7866040518080602001838152602001828103825260098152602001807f6368616e6e656c496400000000000000000000000000000000000000000000008152602001506020019250505060405180910390a16040805186815290517f28d9a4664ab5cb57d0a13e35c1cc553801648793127552f85cfeac2fc4d6ca8e9181900360200190a17fe8407a0209fa99ec3a7228aff140c3d3e68bd279391739c7e0b65cd406cc93b584604051808060200180602001838103835260058152602001807f73746174650000000000000000000000000000000000000000000000000000008152602001506020018381038252848181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156112805780820380516001836020036101000a031916815260200191505b50935050505060405180910390a16040805160208101839052818152600b818301527f66696e6765727072696e74000000000000000000000000000000000000000000606082015290517f02d93529bba9d141e5e06733c52c7e6fbcb1149586adb5c24064b522ab26f1d79181900360800190a160008681526020819052604090206001015461131c9082908590600160a060020a03166100ba565b1515611375576040805160208082526012908201527f7369676e61747572653020696e76616c696400000000000000000000000000008183015290516000805160206118f08339815191529181900360600190a16110a5565b60008681526020819052604090206002015461139d9082908490600160a060020a03166100ba565b15156113f6576040805160208082526012908201527f7369676e61747572653120696e76616c696400000000000000000000000000008183015290516000805160206118f08339815191529181900360600190a16110a5565b6000868152602081905260409020600601548511611461576040805160208082526017908201527f73657175656e6365206e756d62657220746f6f206c6f770000000000000000008183015290516000805160206118f08339815191529181900360600190a16110a5565b60008681526020818152604082208651600591909101805481855293839020909360026001821615610100026000190190911604601f9081018490048201938901908390106114c357805160ff19168380011785555b5061108e929150610f19565b828001600101855582156114b7579182015b828111156114b75782518260005055916020019190600101906114d5565b6000848152602081905260409020600381015442016004820155600201805474ff0000000000000000000000000000000000000000191660a060020a1790555b50505050565b50604080517f636c6f73696e6754780000000000000000000000000000000000000000000000815260098101859052815190819003602901902060008581526020819052919091206001015461159b9082908590600160a060020a03166100ba565b1580156115cd57506000848152602081905260409020600201546115cb9082908590600160a060020a03166100ba565b155b156114f3576040805160208082526011908201527f7369676e617475726520696e76616c69640000000000000000000000000000008183015290516000805160206118f08339815191529181900360600190a1611533565b848460405180807f65766964656e6365547800000000000000000000000000000000000000000000815260200150600a018381526020018280519060200190808383829060006004602084601f0104600f02600301f15090500192505050604051809103902090508160ff16600014156116c1576000858152602081905260409020600101546116f59082908590600160a060020a03166100ba565b8160ff16600114156117ea5760008581526020819052604090206002015461183d9082908590600160a060020a03166100ba565b151561174e576040805160208082526011908201527f7369676e617475726520696e76616c69640000000000000000000000000000008183015290516000805160206118f08339815191529181900360600190a16117e3565b60008581526020818152604082208651600791909101805481855293839020909360026001821615610100026000190190911604601f9081018490048201938901908390106117b057805160ff19168380011785555b506117e0929150610f19565b828001600101855582156117a4579182015b828111156117a45782518260005055916020019190600101906117c2565b50505b5050505050565b6040805160208082526013908201527f7061727469636970616e7420696e76616c6964000000000000000000000000008183015290516000805160206118f08339815191529181900360600190a16117e3565b1515611896576040805160208082526011908201527f7369676e617475726520696e76616c69640000000000000000000000000000008183015290516000805160206118f08339815191529181900360600190a16117e3565b60008581526020818152604082208651600891909101805481855293839020909360026001821615610100026000190190911604601f9081018490048201938901908390106117b057805160ff19168380011785556117a45608c379a0afcc32b1a39302f7cb8073359698411ab5fd6e3edb2c02c0b5fba8aa",
    unlinked_binary: "6060604052611910806100126000396000f36060604052361561006c5760e060020a600035046339cdde32811461006e57806366a2b472146100d057806377d32e94146101d25780637c01e46f14610239578063831c2b821461037b5780639b83cd2514610445578063c8662b5d14610505578063d18da8b1146106e2575b005b60408051602060248035600481810135601f810185900485028601850190965285855261075d958135959194604494929390920191819084018382808284375094965050933593505050505b600081600160a060020a0316610a45858561021c565b60408051602060248035600481810135601f810185900485028601850190965285855261006c9581359591946044949293909201918190840183828082843750506040805160209735808a0135601f81018a90048a0283018a0190935282825296989760649791965060249190910194509092508291508401838280828437509496505093359350505050600084815260208190526040812060029081015460a060020a900460ff16141561162557604080516020808252600e908201527f6368616e6e656c20636c6f7365640000000000000000000000000000000000008183015290516000805160206118f08339815191529181900360600190a16117e3565b60408051602060248035600481810135601f810185900485028601850190965285855261076f95813595919460449492939092019181908401838280828437509496505050505050505b600060006000600084516041141515610965575b50505092915050565b604080516020604435600481810135601f810184900484028501840190955284845261006c948135946024803595939460649492939101918190840183828082843750506040805160209735808a0135601f81018a90048a0283018a0190935282825296989760849791965060249091019450909250829150840183828082843750506040805160209735808a0135601f81018a90048a0283018a0190935282825296989760a4979196506024919091019450909250829150840183828082843750949650505050505050600085815260208190526040812060029081015460a060020a900460ff1614156110ad57604080516020808252600e908201527f6368616e6e656c20636c6f7365640000000000000000000000000000000000008183015290516000805160206118f08339815191529181900360600190a16110a5565b61078c600435604080516020818101835260008083528351808301855281815284518084018652828152868352828452855186842060018181015460028381015460038501546004860154600596909601805495861615610100026000190190951692909204601f81018b90048b0287018b01909c528b8652600160a060020a039283169b9281169a60a060020a90910460ff1699919894979096949590949390929091830182828015610af35780601f10610ac857610100808354040283529160200191610af3565b60408051602060248035600481810135601f810185900485028601850190965285855261006c9581359591946044949293909201918190840183828082843750949650509335935050505060008381526020819052604081206002015460a060020a900460ff168114611539576040805160208082526010908201527f6368616e6e656c206e6f74206f70656e000000000000000000000000000000008183015290516000805160206118f08339815191529181900360600190a1611533565b604080516020606435600481810135601f810184900484028501840190955284845261006c948135946024803595604435956084949201919081908401838280828437505060408051602060a435808b0135601f810183900483028401830190945283835297999835989760c4975091955060249190910193509091508190840183828082843750506040805160209735808a0135601f81018a90048a0283018a0190935282825296989760e49791965060249190910194509092508291508401838280828437509496505050505050506040805160208181018352600080835283518083018552818152845161014081018652828152808401839052808601839052606081018390526080810183905260a081018390528551808501875283815260c082015260e0810183905285518085018752838152610100820152855180850187528381526101208201528c83529282905293812054909391908b1415610c5a57604080516020808252602a908201527f6368616e6e656c20776974682074686174206368616e6e656c496420616c7265818301527f6164792065786973747300000000000000000000000000000000000000000000606082015290516000805160206118f08339815191529181900360800190a1610c4d565b6108f76004356040805160208181018352600080835284815280825283902060050180548451601f600260001961010060018616150201909316929092049182018490048402810184019095528085529293929091830182828015610abc5780601f10610a9157610100808354040283529160200191610abc565b60408051918252519081900360200190f35b60408051600160a060020a03929092168252519081900360200190f35b604051808a600160a060020a0316815260200189600160a060020a031681526020018860ff1681526020018781526020018681526020018060200185815260200180602001806020018481038452888181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f16801561082d5780820380516001836020036101000a031916815260200191505b508481038352868181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156108865780820380516001836020036101000a031916815260200191505b508481038252858181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156108df5780820380516001836020036101000a031916815260200191505b509c5050505050505050505050505060405180910390f35b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156109575780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b50506040805160208581015186840151604188015160ff81168552945191955093927f6eb4dfa3aaaccfd9808ba31f45f31c585da5460677f6491f773cba39ee872c3492908290030190a1601b8160ff1610156109c057601b015b6040805160ff8316815290517f6eb4dfa3aaaccfd9808ba31f45f31c585da5460677f6491f773cba39ee872c349181900360200190a1600186828585604051808581526020018460ff1681526020018381526020018281526020019450505050506020604051808303816000866161da5a03f115610002575050604051519350610230565b600160a060020a031614905080507fc33356bc2bad2ce263b056da5d061d4e89c336823d5e77f14c1383aedb7a1b3a816040518082815260200191505060405180910390a19392505050565b820191906000526020600020905b815481529060010190602001808311610a9f57829003601f168201915b50505050509050919050565b820191906000526020600020905b815481529060010190602001808311610ad657829003601f168201915b50505060008d8152602081815260408051928190206006810154600791909101805460026001821615610100026000190190911604601f8101859004850286018501909352828552969a50985091949350909150830182828015610b985780601f10610b6d57610100808354040283529160200191610b98565b820191906000526020600020905b815481529060010190602001808311610b7b57829003601f168201915b50505060008d815260208181526040805192819020600801805460026001821615610100026000190190911604601f810184900484028501840190925281845295975091949350909150830182828015610c335780601f10610c0857610100808354040283529160200191610c33565b820191906000526020600020905b815481529060010190602001808311610c1657829003601f168201915b50939450505050509193959799909294969850565b505050505b5050505050505050505050565b8a8a8a8a60405180807f6164644368616e6e656c00000000000000000000000000000000000000000000815260200150600a0185815260200184600160a060020a03166c0100000000000000000000000002815260140183600160a060020a03166c010000000000000000000000000281526014018280519060200190808383829060006004602084601f0104600f02600301f15090500194505050505060405180910390209350610d0d84878c6100ba565b1515610d66576040805160208082526012908201527f7369676e61747572653020696e76616c696400000000000000000000000000008183015290516000805160206118f08339815191529181900360600190a1610c4d565b610d7184868b6100ba565b1515610dca576040805160208082526012908201527f7369676e61747572653120696e76616c696400000000000000000000000000008183015290516000805160206118f08339815191529181900360600190a1610c4d565b610140604051908101604052808c81526020018b81526020018a815260200160008152602001888152602001600081526020018981526020016000815260200184815260200183815260200150905080600060005060008d81526020019081526020016000206000506000820151816000016000505560208201518160010160006101000a815481600160a060020a030219169083021790555060408201518160020160006101000a815481600160a060020a030219169083021790555060608201518160020160146101000a81548160ff021916908302179055506080820151816003016000505560a0820151816004016000505560c0820151816005016000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610f2d57805160ff19168380011785555b50610f5d9291505b80821115610fca5760008155600101610f19565b82800160010185558215610f11579182015b82811115610f11578251826000505591602001919060010190610f3f565b505060e08201518160060160005055610100820151816007016000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610fce57805160ff19168380011785555b50610ffe929150610f19565b5090565b82800160010185558215610fbe579182015b82811115610fbe578251826000505591602001919060010190610fe0565b5050610120820151816008016000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061105e57805160ff19168380011785555b50610c48929150610f19565b82800160010185558215611052579182015b82811115611052578251826000505591602001919060010190611070565b505060008681526020819052604090206006018590555b505050505050565b85858560405180807f75706461746554780000000000000000000000000000000000000000000000008152602001506008018481526020018381526020018280519060200190808383829060006004602084601f0104600f02600301f1509050019350505050604051809103902090507f02d93529bba9d141e5e06733c52c7e6fbcb1149586adb5c24064b522ab26f1d7866040518080602001838152602001828103825260098152602001807f6368616e6e656c496400000000000000000000000000000000000000000000008152602001506020019250505060405180910390a16040805186815290517f28d9a4664ab5cb57d0a13e35c1cc553801648793127552f85cfeac2fc4d6ca8e9181900360200190a17fe8407a0209fa99ec3a7228aff140c3d3e68bd279391739c7e0b65cd406cc93b584604051808060200180602001838103835260058152602001807f73746174650000000000000000000000000000000000000000000000000000008152602001506020018381038252848181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156112805780820380516001836020036101000a031916815260200191505b50935050505060405180910390a16040805160208101839052818152600b818301527f66696e6765727072696e74000000000000000000000000000000000000000000606082015290517f02d93529bba9d141e5e06733c52c7e6fbcb1149586adb5c24064b522ab26f1d79181900360800190a160008681526020819052604090206001015461131c9082908590600160a060020a03166100ba565b1515611375576040805160208082526012908201527f7369676e61747572653020696e76616c696400000000000000000000000000008183015290516000805160206118f08339815191529181900360600190a16110a5565b60008681526020819052604090206002015461139d9082908490600160a060020a03166100ba565b15156113f6576040805160208082526012908201527f7369676e61747572653120696e76616c696400000000000000000000000000008183015290516000805160206118f08339815191529181900360600190a16110a5565b6000868152602081905260409020600601548511611461576040805160208082526017908201527f73657175656e6365206e756d62657220746f6f206c6f770000000000000000008183015290516000805160206118f08339815191529181900360600190a16110a5565b60008681526020818152604082208651600591909101805481855293839020909360026001821615610100026000190190911604601f9081018490048201938901908390106114c357805160ff19168380011785555b5061108e929150610f19565b828001600101855582156114b7579182015b828111156114b75782518260005055916020019190600101906114d5565b6000848152602081905260409020600381015442016004820155600201805474ff0000000000000000000000000000000000000000191660a060020a1790555b50505050565b50604080517f636c6f73696e6754780000000000000000000000000000000000000000000000815260098101859052815190819003602901902060008581526020819052919091206001015461159b9082908590600160a060020a03166100ba565b1580156115cd57506000848152602081905260409020600201546115cb9082908590600160a060020a03166100ba565b155b156114f3576040805160208082526011908201527f7369676e617475726520696e76616c69640000000000000000000000000000008183015290516000805160206118f08339815191529181900360600190a1611533565b848460405180807f65766964656e6365547800000000000000000000000000000000000000000000815260200150600a018381526020018280519060200190808383829060006004602084601f0104600f02600301f15090500192505050604051809103902090508160ff16600014156116c1576000858152602081905260409020600101546116f59082908590600160a060020a03166100ba565b8160ff16600114156117ea5760008581526020819052604090206002015461183d9082908590600160a060020a03166100ba565b151561174e576040805160208082526011908201527f7369676e617475726520696e76616c69640000000000000000000000000000008183015290516000805160206118f08339815191529181900360600190a16117e3565b60008581526020818152604082208651600791909101805481855293839020909360026001821615610100026000190190911604601f9081018490048201938901908390106117b057805160ff19168380011785555b506117e0929150610f19565b828001600101855582156117a4579182015b828111156117a45782518260005055916020019190600101906117c2565b50505b5050505050565b6040805160208082526013908201527f7061727469636970616e7420696e76616c6964000000000000000000000000008183015290516000805160206118f08339815191529181900360600190a16117e3565b1515611896576040805160208082526011908201527f7369676e617475726520696e76616c69640000000000000000000000000000008183015290516000805160206118f08339815191529181900360600190a16117e3565b60008581526020818152604082208651600891909101805481855293839020909360026001821615610100026000190190911604601f9081018490048201938901908390106117b057805160ff19168380011785556117a45608c379a0afcc32b1a39302f7cb8073359698411ab5fd6e3edb2c02c0b5fba8aa",
    address: "0xc887ad62e0c140b3d46dcb7e85c0f28b0e65fd08",
    generated_with: "2.0.6",
    contract_name: "StateChannels"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("StateChannels error: Please call load() first before creating new instance of this contract.");
    }

    Contract.Pudding.apply(this, arguments);
  };

  Contract.load = function(Pudding) {
    Contract.Pudding = Pudding;

    Pudding.whisk(contract_data, Contract);

    // Return itself for backwards compatibility.
    return Contract;
  }

  Contract.new = function() {
    if (Contract.Pudding == null) {
      throw new Error("StateChannels error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("StateChannels error: lease call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("StateChannels error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.StateChannels = Contract;
  }

})();