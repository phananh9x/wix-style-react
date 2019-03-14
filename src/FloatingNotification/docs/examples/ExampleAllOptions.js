/* eslint-disable */
<div style={{display: 'flex', flexWrap: 'wrap'}}>
  <div style={{marginRight: '12px', marginBottom: '12px'}}><FloatingNotification
    text="this is some text"
    prefixIcon={<StatusComplete />}
  /></div>
  <div style={{marginRight: '12px', marginBottom: '12px'}}><FloatingNotification
    text="this is some text"
    showButton
    buttonProps={{ label: 'Undo' }}
  /></div>
  <div style={{marginRight: '12px', marginBottom: '12px'}}><FloatingNotification
    text="this is some text"
    showTextButton
    textButtonProps={{ label: 'Trash' }}
  /></div>
  <div style={{marginRight: '12px', marginBottom: '12px'}}><FloatingNotification
    text="this is some text"
    showButton
    buttonProps={{ label: 'Undo' }}
    showTextButton
    textButtonProps={{ label: 'Trash' }}
  /></div>
  <div style={{marginRight: '12px', marginBottom: '12px'}}><FloatingNotification
    text="this is some text"
    showButton
    buttonProps={{ label: 'Undo' }}
    showTextButton
    textButtonProps={{ label: 'Trash' }}
    showCloseButton={false}
    prefixIcon={<StatusComplete />}
  /></div>
  <div style={{marginRight: '12px', marginBottom: '12px'}}><FloatingNotification
    text="this is some text"
    showButton
    buttonProps={{ label: 'Undo' }}
    showTextButton
    textButtonProps={{ label: 'Trash' }}
    prefixIcon={<StatusComplete />}
  /></div>
</div>
