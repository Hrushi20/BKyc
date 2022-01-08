const KycStorage = artifacts.require('KycStorage.sol');

contract('KycStorage',() => {
	it('Storing and verifying data',async()=>{
		const storage = await KycStorage.new();
		await storage.setData('98765','fj32321d','35fad31234');
		const data = await storage.getData('98765');
		assert(data[0] === '98765' && data[1] === 'fj32321d' && data[2] === '35fad31234')
	});

	it(`Data doesn't exists`,async() => {
		const storage = await KycStorage.new();
		const data = await storage.getData('98765');
		assert(data[0] === "Data doesn't exists" && data[1] === '' && data[2] === '');
	});
});
