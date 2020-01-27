import React, { useCallback } from 'react';
import { ReactComponent as AddSVG } from '../../static/images/svg/add.svg';
import { ReactComponent as CloseSVG } from '../../static/images/svg/close.svg';

function Item({ pk, content, onClick, onClose, isActive = false }) {
  const handleClick = useCallback(() => {
    onClick(pk);
  }, [pk, onClick]);
  const handleClose = useCallback(
    e => {
      e.stopPropagation();
      onClose(pk);
    },
    [pk, onClose]
  );

  return (
    <div
      className={`multiple-form__selector-item${
        isActive ? ' multiple-form__selector-item--active' : ''
      }`}
      onClick={handleClick}
    >
      {content || pk}
      {onClose && (
        <div className="multiple-form__selector-item-close" onClick={handleClose}>
          <CloseSVG />
        </div>
      )}
    </div>
  );
}

function Selector({ items, onSelect, onAdd, onDelete, selected }) {
  const handleAdd = useCallback(() => {
    onAdd();
  }, [onAdd]);
  const handleSelect = useCallback(
    index => () => {
      onSelect(index);
    },
    [onSelect]
  );
  const handleDelete = useCallback(
    index => () => {
      onDelete(index);
    },
    [onDelete]
  );

  return (
    <div className="multiple-form__selector">
      {items.map((item, index) => (
        <Item
          onClick={handleSelect(index)}
          pk={index + 1}
          isActive={selected === index}
          onClose={items.length !== 1 ? handleDelete(index) : undefined}
        />
      ))}
      <div
        className="multiple-form__selector-item multiple-form__selector-item--new"
        onClick={handleAdd}
      >
        <AddSVG />
      </div>
    </div>
  );
}

export default Selector;
