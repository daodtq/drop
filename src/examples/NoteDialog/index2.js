import React from 'react';
import PropTypes from 'prop-types';

const NoteDialog = ({ open2, handleClose2, note, note2, setNote, handleChangeNote, user }) => {
    if (!open2) return null;
    const capitalizeAndColorBeforeColon = (note) => {
        const lines = note.split('\n');
        const totalLines = lines.length;
        const linesToShow = 10;

        const displayLines = totalLines > linesToShow
            ? ['...'].concat(lines.slice(totalLines - linesToShow))
            : lines;

        return displayLines.map((line, index) => {
            const [beforeColon, afterColon] = line.split(':', 2);
            const capitalizedBeforeColon = beforeColon.trim().charAt(0).toUpperCase() + beforeColon.trim().slice(1);
            const isUser = capitalizedBeforeColon.toLowerCase() === user;

            return (
                <div key={index} style={{
                    display: 'flex',
                    justifyContent: isUser ? 'flex-end' : 'flex-start',
                    margin: '5px 0'
                }}>
                    <div style={{
                        backgroundColor: isUser ? '#DCF8C6' : '#FFF',
                        color: 'black',
                        padding: '10px',
                        borderRadius: '10px',
                        maxWidth: '80%',
                        textAlign: 'left',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
                    }}>
                        {!isUser && <span style={{ color: 'red' }}>{capitalizedBeforeColon} :</span>} {afterColon ? afterColon.trim() : ""}
                    </div>
                </div>
            );
        });
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.dialog}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Note</h2>
                    <button style={styles.closeButton} onClick={handleClose2}>×</button>
                </div>
                <div style={styles.content}>
                    {note ? <span style={{
                        fontSize: "11px",
                        color: "black",
                        overflowWrap: "break-word",
                        wordWrap: "break-word",
                        whiteSpace: "pre-wrap",
                        display: "block"
                    }}>{capitalizeAndColorBeforeColon(note)}</span> : null}
                    <textarea
                        style={styles.textarea}
                        value={note2}
                        rows={3}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Enter your note"
                    />
                </div>
                <div style={styles.actions}>
                    <button onClick={handleChangeNote} style={styles.updateButton}>
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

NoteDialog.propTypes = {
    open2: PropTypes.bool.isRequired,
    handleClose2: PropTypes.func.isRequired,
    note: PropTypes.string.isRequired,
    note2: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    setNote: PropTypes.func.isRequired,
    handleChangeNote: PropTypes.func.isRequired,
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    dialog: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        width: '600px',
        maxWidth: '100%',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        boxSizing: 'border-box',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #e0e0e0',
        paddingBottom: '10px',
        marginBottom: '20px',
    },
    title: {
        margin: 0,
        fontSize: '18px',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
    },
    content: {
        marginBottom: '20px',
        width: "100%"
    },
    textarea: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #e0e0e0',
        fontSize: '14px',
        boxSizing: 'border-box',
        resize: 'none',
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    updateButton: {
        backgroundColor: 'green',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
    },
};

export default NoteDialog;
