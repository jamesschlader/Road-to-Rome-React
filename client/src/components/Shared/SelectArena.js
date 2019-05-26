const = ()=>(<div className="row">
  <label>Select an Arena </label>
  <select
    className="col s12 browser-default"
    value={this.state.ArenaId}
    name="ArenaId"
    onChange={this.handleAbility}
  >
    <option value="">Select an Arena</option>
    {this.displayArenas()}
  </select>
</div>)
