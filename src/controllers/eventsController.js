const { request, response } = require( 'express' );
const Event = require( '../models/event' );

const getEvents = async ( req = request, res = response ) => {
	try {
		const events = await Event.find().populate( 'user', 'name' );

		res.json( {
			ok: true,
			events
		} );

	} catch ( e ) {
		res.status( 500 ).json( {
			ok: false,
			error: e
		} );
	}
};

const createEvent = async ( req = request, res = response ) => {

	try {
		const { user } = req;
		const event = new Event( { ...req.body, user: user?.uid } );

		await event.save();

		res.status( 201 ).json( {
			ok: true, event
		} );

	} catch ( e ) {
		res.status( 500 ).json( {
			ok: false,
			error: e
		} );
	}

};

const updateEvent = async ( req = request, res = response ) => {
	try {
		const eventId = req.params.id;
		const { user } = req;
		let event = await Event.findById( eventId );

		if ( !event ) {
			return res.status( 400 ).json( {
				ok: false,
				message: 'El evento no existe'
			} );
		}

		if ( event.user.toString() !== user.uid ) {
			return res.status( 401 ).json( {
				ok: false,
				message: 'No tienes permisos para editar este evento'
			} );
		}

		event = await Event.findByIdAndUpdate( eventId, req.body, { new: true } );

		return res.status( 200 ).json( {
			ok: true,
			event
		} );

	} catch ( e ) {
		res.status( 500 ).json( {
			ok: false,
			error: e
		} );
	}

};

const deleteEvent = async ( req = request, res = response ) => {
	try {
		const eventId = req.params.id;
		const { user } = req;
		const event = await Event.findById( eventId );

		if ( !event ) {
			return res.status( 400 ).json( {
				ok: false,
				message: 'El evento no existe'
			} );
		}

		if ( event.user.toString() !== user.uid ) {
			return res.status( 401 ).json( {
				ok: false,
				message: 'No tienes permisos para eliminar este evento'
			} );
		}

		await Event.findOneAndDelete( eventId );

		return res.status( 200 ).json( {
			ok: true
		} );

	} catch ( e ) {
		res.status( 500 ).json( {
			ok: false,
			error: e
		} );
	}
};

module.exports = {
	getEvents,
	createEvent,
	updateEvent,
	deleteEvent
};
