const deleteFiles = async (product, image) => {
	try {
		await axios.delete(`http://localhost:3000/api/products/${product}`);
		await axios.delete(`http://localhost:3000/idimage/${image}`);
	} catch (error) {
		console.error(error);
	}
};
const runFormi = ()=>{
	const formi = document.getElementById('formi');
	if(formi){
		document.getElementById('formi').addEventListener('submit', async(e)=>{
			e.preventDefault;
			const image = await document.getElementById('image-id').innerHTML;
			const product = await document.getElementById('id-id').innerHTML;
			await deleteFiles(product, image);
		});
	}
};
runFormi();