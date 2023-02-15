import Joi from 'joi';

const create = {
	body: Joi.object().keys({
		name: Joi.string().required(),
		description: Joi.string().required(),
		sku: Joi.string().required(),
        manufacturer: Joi.string().required(),
        quantity: Joi.number().integer().min(0).max(100).required(),
	}),
}

const fetchById = {
	params: Joi.object().keys({
		productId: Joi.string().required(),
	}),
};

const updatePutById = {
    params: Joi.object().keys({
		productId: Joi.string().required(),
	}),
    body: Joi.object().keys({
		name: Joi.string().required(),
		description: Joi.string().required(),
		sku: Joi.string().required(),
        manufacturer: Joi.string().required(),
        quantity: Joi.number().integer().min(0).max(100).required(),
	}),
};

const updatePatchById = {
    params: Joi.object().keys({
		productId: Joi.string().required(),
	}),
    body: Joi.object().keys({
		name: Joi.string(),
		description: Joi.string(),
		sku: Joi.string(),
        manufacturer: Joi.string(),
        quantity: Joi.number().integer().min(0).max(100),
	}),
};

const deleteById = {
    params: Joi.object().keys({
		productId: Joi.string().required(),
	}),
};

export default {
    create,
    fetchById,
    updatePutById,
    updatePatchById,
    deleteById,
}