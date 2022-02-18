const Note = require("../models/Note");

const createNote = async (req, res) => {
    const body = req.body;
    const { contentNote } = body;

    const note = Note({ contentNote, 'userId': req.user._id });
    await note.save();

    return res.status(200).json({
        ok: true,
        msg: 'Note created',
        newTodo: {
            'contentNote': note.contentNote,
            'complete': false,
            'id': note._id
        }
    })
}

const completeNote = async (req, res) => {
    const { id } = req.params;
    const existNote = await Note.findByIdAndUpdate(id, { completed: true });

    if (!existNote) {
        return res.status(400).json({
            ok: false,
            msg: 'No existe una nota con esa ID',
        })
    }

    res.status(200).json({
        ok: true,
        msg: 'Nota completada con exito'
    })
}

const noCompletNote = async (req, res) => {
    const { id } = req.params;
    const existNote = await Note.findByIdAndUpdate(id, { completed: false });
    
    if (!existNote) {
        return res.status(400).json({
            ok: false,
            msg: 'No existe una nota con esa ID',
        })
    }

    res.status(200).json({
        ok: true,
        msg: 'Nota modificada con exito'
    })
}


const delteNote = async (req, res) => {
    const { id } = req.params;
    const existNote = await Note.findByIdAndUpdate(id, { state: false });

    if (!existNote) {
        return res.status(400).json({
            ok: false,
            msg: 'No existe una nota con esa ID',
        })
    }

    res.status(200).json({
        ok: true,
        msg: 'Nota borrada con exito'
    })
}

module.exports = {
    createNote,
    delteNote,
    completeNote,
    noCompletNote
}