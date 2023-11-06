<div key={index} className="card-option">
                    <div className="card-image-container">
                    <h1>Tarjeta</h1>
                    <hr />
                      <img src={`/${cards.cardType}.png`} alt={card.type} className="card-image" />
                      <hr />
                      <Button variant="outline-secondary" className="boton" onClick={handleDelete}>
                        Cancelar
                      </Button>
                      <EliminarTarjeta id={card.id} onDeleteCard={deleteCard} />
                      <hr />
                      <EditarTarjeta cardId={card.id} onEditCard={editCard} />
                      
                    </div>
                  </div>