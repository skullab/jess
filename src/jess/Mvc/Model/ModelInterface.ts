export interface ModelInterface {
	setSource();
	getSource();
	setSchema();
	getSchema();
	setDbConnection();
	getDbConnection();
	create();
	update();
	delete();
	save();
	count();
	find();
	findFirst();
	query();
}