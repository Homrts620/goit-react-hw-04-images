import React, { Component } from "react";
import css from "./SearchBar.module.css";
import PropTypes from "prop-types";

class SearchBar extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const query = form.elements.query.value;
        this.props.onSubmit({ query });
    };

render () {
    return (
        <header className={css.searchbar}>
				<form className={css.form} onSubmit={this.handleSubmit}>
					<button type="submit" className={css.button}>
						<span className={css["button-label"]}>Search</span>
					</button>

					<input
						name="query"
						className={css.input}
						type="text"
						autoComplete="off"
						autoFocus
						placeholder="Search images and photos"
					/>
				</form>
			</header>
    );
}
}

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;